/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { MouseEventHandler, useState } from 'react';
import _ from 'lodash';

interface OnClickProps {
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  data?: any;
  items?: any[];
  [key: `onClick${string}`]?: MouseEventHandler<HTMLElement> | undefined;
  [key: `onSubmit${string}`]?: MouseEventHandler<HTMLFormElement> | undefined;
  [key: `onChange${string}`]?: MouseEventHandler<HTMLInputElement> | undefined;
  [key: `onFocus${string}`]?: MouseEventHandler<HTMLInputElement> | undefined;
  [key: `onBlur${string}`]?: MouseEventHandler<HTMLInputElement> | undefined;
}

const TableHeader: React.FC = () => {
  return (
    <thead className="bg-gray-100 border-b-2 border-gray-300">
      <tr>
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300 w-1/5">
          Tên
        </th>
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300 w-1/6">
          Mã
        </th>
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300 w-1/4">
          Giảm 2% thuế suất thuế GTGT
        </th>
        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-300 w-1/8">
          Số lượng tồn
        </th>
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/3">
          Tính chất
        </th>
      </tr>
    </thead>
  );
};

const ProductCell: React.FC<{
  children: React.ReactNode;
  className?: string;
  isLast?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
}> = ({ children, className = '', isLast = false, onClick }) => {
  const borderClass = isLast ? '' : 'border-r border-gray-200';
  
  return (
    <td 
      className={`px-4 py-4 text-sm text-gray-800 ${borderClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </td>
  );
};

const ProductRow: React.FC<{
  product: any;
  isEven: boolean;
  onClickRow?: MouseEventHandler<HTMLElement>;
}> = ({ product, isEven, onClickRow }) => {
  const name = _.get(product, 'name', '');
  const code = _.get(product, 'code', '');
  const vatDiscount = _.get(product, 'vatDiscount', 'Không xác định');
  const stockQuantity = _.get(product, 'stockQuantity', 0);
  const category = _.get(product, 'category', '');

  const bgColor = isEven ? 'bg-white' : 'bg-gray-50';

  return (
    <tr 
      className={`${bgColor} hover:bg-blue-50 transition-colors duration-200 border-b border-gray-200 cursor-pointer`}
      onClick={onClickRow}
    >
      <ProductCell className="font-medium text-gray-900">
        {name}
      </ProductCell>
      <ProductCell className="font-mono text-blue-600 font-semibold">
        {code}
      </ProductCell>
      <ProductCell className="text-gray-600">
        {vatDiscount}
      </ProductCell>
      <ProductCell className="text-center font-bold text-lg text-gray-900">
        {stockQuantity}
      </ProductCell>
      <ProductCell className="text-gray-700" isLast>
        <div className="max-w-xs">
          <span className="text-sm leading-relaxed break-words">
            {category}
          </span>
        </div>
      </ProductCell>
    </tr>
  );
};

const SummaryCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, icon, color }) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow border-l-4 ${color}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

const FilterControls: React.FC<{
  onFilterChange?: (filter: string) => void;
  onSortChange?: (sort: string) => void;
}> = ({ onFilterChange, onSortChange }) => {
  return (
    <div className="mb-6 flex flex-wrap gap-4 items-center">
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700">Lọc theo:</label>
        <select 
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onFilterChange?.(e.target.value)}
        >
          <option value="">Tất cả</option>
          <option value="service">Dịch vụ</option>
          <option value="goods">Hàng hoá</option>
          <option value="tools">Công cụ dụng cụ</option>
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700">Sắp xếp:</label>
        <select 
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onSortChange?.(e.target.value)}
        >
          <option value="name">Tên A-Z</option>
          <option value="code">Mã</option>
          <option value="quantity">Số lượng</option>
        </select>
      </div>
    </div>
  );
};

const InventoryTable: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  ...props
}) => {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('name');

  const defaultInventory = [
    {
      id: 1,
      name: 'Bán lâm việc',
      code: 'BLV_1',
      vatDiscount: 'Không xác định',
      stockQuantity: 10,
      category: 'Hàng Công Thành Hàng Nguyên Dịch hoá, cụ phẩm, hoá, vật liệu, vụ, dụng cư,'
    },
    {
      id: 2,
      name: 'Chi phí mua hàng',
      code: 'CPMH',
      vatDiscount: 'Không xác định',
      stockQuantity: 0,
      category: 'Dịch vụ'
    },
    {
      id: 3,
      name: 'Chi phí vận chuyển',
      code: 'CPVC',
      vatDiscount: 'Không xác định',
      stockQuantity: 0,
      category: 'Dịch vụ'
    },
    {
      id: 4,
      name: 'Công cụ dụng cụ',
      code: 'CCDC',
      vatDiscount: 'Không xác định',
      stockQuantity: 0,
      category: 'Công cụ dụng cụ'
    },
    {
      id: 5,
      name: 'Bộ cấu 1 khối 38 + LT35LL T loại AA L1',
      code: 'BOCAU_AAL1',
      vatDiscount: 'Không xác định',
      stockQuantity: 5,
      category: 'Hàng hoá'
    }
  ];

  const safeItems = _.isArray(items) && items.length > 0 ? items : defaultInventory;
  const inventory = _.get(data, 'inventory', safeItems);

  const filteredInventory = _.filter(inventory, (item) => {
    if (!filter) return true;
    const category = _.get(item, 'category', '').toLowerCase();
    switch (filter) {
      case 'service':
        return category.includes('dịch vụ');
      case 'goods':
        return category.includes('hàng hoá');
      case 'tools':
        return category.includes('công cụ');
      default:
        return true;
    }
  });

  const sortedInventory = _.sortBy(filteredInventory, (item) => {
    switch (sort) {
      case 'code':
        return _.get(item, 'code', '');
      case 'quantity':
        return _.get(item, 'stockQuantity', 0);
      default:
        return _.get(item, 'name', '');
    }
  });

  const totalItems = inventory.length;
  const totalInStock = _.sumBy(inventory, 'stockQuantity');
  const outOfStock = _.filter(inventory, item => _.get(item, 'stockQuantity', 0) === 0).length;

  const handleRowClick = (product: any) => (event: React.MouseEvent) => {
    props.onClickProduct?.(event);
  };

  return (
    <div id={id} style={style} className={`w-full max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen ${className ?? ''}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bảng kê khai hàng tồn kho</h1>
        <p className="text-gray-600">Quản lý và theo dõi tình trạng hàng hóa trong kho</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          title="Tổng sản phẩm"
          value={totalItems}
          color="border-l-blue-500"
          icon={
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          }
        />
        <SummaryCard
          title="Tổng số lượng"
          value={totalInStock}
          color="border-l-green-500"
          icon={
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />
        <SummaryCard
          title="Hết hàng"
          value={outOfStock}
          color="border-l-red-500"
          icon={
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.856-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          }
        />
      </div>

      <FilterControls 
        onFilterChange={setFilter}
        onSortChange={setSort}
      />

      <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <TableHeader />
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedInventory.map((product: any, index: number) => (
                <ProductRow
                  key={_.get(product, 'id', index)}
                  product={product}
                  isEven={index % 2 === 0}
                  onClickRow={handleRowClick(product)}
                />
              ))}
              {sortedInventory.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center">
                    <div className="text-gray-500">
                      <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <p className="text-lg font-medium">Không có dữ liệu</p>
                      <p className="text-sm">Không tìm thấy sản phẩm nào phù hợp với bộ lọc</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        Hiển thị {sortedInventory.length} trên tổng {totalItems} sản phẩm
      </div>
    </div>
  );
};

export default InventoryTable;