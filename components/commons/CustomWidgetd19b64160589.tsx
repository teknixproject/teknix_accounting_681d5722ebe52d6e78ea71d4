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

const TableCell: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}> = ({ children, className = '', onClick }) => {
  return (
    <td 
      className={`px-4 py-3 text-sm text-gray-800 border-r border-gray-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </td>
  );
};

const TableHeaderCell: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <th className={`px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider bg-gray-100 border-r border-gray-200 ${className}`}>
      {children}
    </th>
  );
};

const ProductRow: React.FC<{
  product: any;
  index: number;
  onClickEdit?: MouseEventHandler<HTMLElement>;
  onClickDelete?: MouseEventHandler<HTMLElement>;
}> = ({ product, index, onClickEdit, onClickDelete }) => {
  const name = _.get(product, 'name', '');
  const code = _.get(product, 'code', '');
  const vatDiscount = _.get(product, 'vatDiscount', 'Không xác định');
  const quantity = _.get(product, 'quantity', 0);
  const category = _.get(product, 'category', '');

  const rowBgColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';

  return (
    <tr className={`${rowBgColor} hover:bg-blue-50 transition-colors duration-150 border-b border-gray-200`}>
      <TableCell className="font-medium">
        {name}
      </TableCell>
      <TableCell className="text-center font-mono">
        {code}
      </TableCell>
      <TableCell className="text-center">
        {vatDiscount}
      </TableCell>
      <TableCell className="text-center font-semibold">
        {quantity}
      </TableCell>
      <TableCell className="border-r-0">
        <div className="max-w-xs">
          <span className="text-xs leading-tight">{category}</span>
        </div>
      </TableCell>
      <TableCell className="border-r-0">
        <div className="flex space-x-2">
          <button
            onClick={onClickEdit}
            className="text-blue-600 hover:text-blue-800 text-xs font-medium"
          >
            Sửa
          </button>
          <button
            onClick={onClickDelete}
            className="text-red-600 hover:text-red-800 text-xs font-medium"
          >
            Xóa
          </button>
        </div>
      </TableCell>
    </tr>
  );
};

const SearchBar: React.FC<{
  onSearch?: (value: string) => void;
  onClickAddNew?: MouseEventHandler<HTMLElement>;
}> = ({ onSearch, onClickAddNew }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  return (
    <div className="mb-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc mã..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80 text-sm"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <button
        onClick={onClickAddNew}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 flex items-center space-x-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span>Thêm mới</span>
      </button>
    </div>
  );
};

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onClickPrevious?: MouseEventHandler<HTMLElement>;
  onClickNext?: MouseEventHandler<HTMLElement>;
  onClickPage?: (page: number) => void;
}> = ({ currentPage, totalPages, totalItems, onClickPrevious, onClickNext, onClickPage }) => {
  return (
    <div className="mt-6 flex justify-between items-center">
      <div className="text-sm text-gray-700">
        Hiển thị <span className="font-medium">{Math.min(currentPage * 10 - 9, totalItems)}</span> đến{' '}
        <span className="font-medium">{Math.min(currentPage * 10, totalItems)}</span> của{' '}
        <span className="font-medium">{totalItems}</span> kết quả
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onClickPrevious}
          disabled={currentPage <= 1}
          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Trước
        </button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => onClickPage?.(page)}
              className={`px-3 py-1 text-sm border rounded ${
                page === currentPage
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          );
        })}
        <button
          onClick={onClickNext}
          disabled={currentPage >= totalPages}
          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Tiếp
        </button>
      </div>
    </div>
  );
};

const ProductInventoryTable: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  ...props
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const defaultProducts = [
    {
      id: 1,
      name: 'Bán lâm việc',
      code: 'BLV_I',
      vatDiscount: 'Không xác định',
      quantity: 10,
      category: 'Hàng Công Thành Hàng Nguyên Dịch Công Thành Hàng Nguyên Dịch Công Thành hoá, cụ phẩm, hoá, vật liệu, vụ, cụ phẩm, hoá, vật liệu, vụ, cụ phẩm dụng cư'
    },
    {
      id: 2,
      name: 'Chi phí mua hàng',
      code: 'CPMH',
      vatDiscount: 'Không xác định',
      quantity: 0,
      category: 'Dịch vụ'
    },
    {
      id: 3,
      name: 'Chi phí vận chuyển',
      code: 'CPVC',
      vatDiscount: 'Không xác định',
      quantity: 0,
      category: 'Dịch vụ'
    },
    {
      id: 4,
      name: 'Công cụ dụng cụ',
      code: 'CCDC',
      vatDiscount: 'Không xác định',
      quantity: 0,
      category: 'Công cụ dụng cụ'
    },
    {
      id: 5,
      name: 'Bộ cấu 1 khối 38 + LT35LL T loại AA L1',
      code: 'BOCAU_AAL1',
      vatDiscount: 'Không xác định',
      quantity: 5,
      category: 'Hàng hoá'
    }
  ];

  const safeItems = _.isArray(items) && items.length > 0 ? items : defaultProducts;
  const products = _.get(data, 'products', safeItems);

  const filteredProducts = _.filter(products, (product) => {
    if (!searchTerm) return true;
    const name = _.get(product, 'name', '').toLowerCase();
    const code = _.get(product, 'code', '').toLowerCase();
    return name.includes(searchTerm.toLowerCase()) || code.includes(searchTerm.toLowerCase());
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div id={id} style={style} className={`w-full max-w-7xl mx-auto p-6 bg-white ${className ?? ''}`}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Quản lý hàng hóa</h1>
        <p className="text-gray-600">Danh sách các sản phẩm và dịch vụ trong kho</p>
      </div>

      <SearchBar 
        onSearch={handleSearch}
        onClickAddNew={props.onClickAddNew}
      />

      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <TableHeaderCell>Tên</TableHeaderCell>
                <TableHeaderCell>Mã</TableHeaderCell>
                <TableHeaderCell>Giảm 2% thuế suất thuế GTGT</TableHeaderCell>
                <TableHeaderCell>Số lượng tồn</TableHeaderCell>
                <TableHeaderCell>Tính chất</TableHeaderCell>
                <TableHeaderCell className="border-r-0">Thao tác</TableHeaderCell>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product: any, index: number) => (
                <ProductRow
                  key={_.get(product, 'id', index)}
                  product={product}
                  index={index}
                  onClickEdit={props.onClickEdit}
                  onClickDelete={props.onClickDelete}
                />
              ))}
              {currentProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    Không tìm thấy sản phẩm nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredProducts.length}
        onClickPrevious={handlePrevious}
        onClickNext={handleNext}
        onClickPage={handlePageChange}
      />
    </div>
  );
};

export default ProductInventoryTable;