/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { MouseEventHandler } from 'react';
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
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
          Tên
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
          Mã
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
          Giảm 2% thuế suất thuế GTGT
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
          Số lượng tồn
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
          Tính chất
        </th>
      </tr>
    </thead>
  );
};

const TableRow: React.FC<{
  item: any;
  onClickRow?: MouseEventHandler<HTMLElement>;
}> = ({ item, onClickRow }) => {
  const name = _.get(item, 'name', '');
  const code = _.get(item, 'code', '');
  const taxStatus = _.get(item, 'taxStatus', '');
  const quantity = _.get(item, 'quantity', 0);
  const nature = _.get(item, 'nature', '');

  return (
    <tr 
      className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
      onClick={onClickRow}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
        {name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
        {code}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
        {taxStatus}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 border-b">
        {quantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
        {nature}
      </td>
    </tr>
  );
};

const VietnameseDataTable: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  ...props
}) => {
  const defaultItems = [
    {
      id: 1,
      name: 'Bán lâm việc',
      code: 'BLV_I',
      taxStatus: 'Không xác định',
      quantity: 10,
      nature: 'Hàng hoá, dịch vụ, Công thành phẩm, hoá, vật liệu, vụ, Dịch vụ công, cụ dùng cư, phẩm, hoá, vật liệu, vụ, cụ dùng phẩm'
    },
    {
      id: 2,
      name: 'Chi phí mua hàng',
      code: 'CPMH',
      taxStatus: 'Không xác định',
      quantity: 0,
      nature: 'Dịch vụ'
    },
    {
      id: 3,
      name: 'Chi phí vận chuyển',
      code: 'CPVC',
      taxStatus: 'Không xác định',
      quantity: 0,
      nature: 'Dịch vụ'
    },
    {
      id: 4,
      name: 'Công cụ dụng cụ',
      code: 'CCDC',
      taxStatus: 'Không xác định',
      quantity: 0,
      nature: 'Công cụ dụng cụ'
    },
    {
      id: 5,
      name: 'Bộ cấu 1 khối 38 + LT35LL T loại AA L1',
      code: 'BOCAU_AAL1',
      taxStatus: 'Không xác định',
      quantity: 5,
      nature: 'Hàng hoá'
    }
  ];

  const safeItems = _.isArray(items) && items.length > 0 ? items : defaultItems;
  const tableData = _.get(data, 'tableData', safeItems);

  const handleRowClick = (item: any) => (event: React.MouseEvent) => {
    props.onClickRow?.(event);
  };

  return (
    <div id={id} style={style} className={`w-full mx-auto bg-white ${className ?? ''}`}>
      <div className="shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <TableHeader />
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData?.map((item: any, index: number) => (
                <TableRow
                  key={_.get(item, 'id', index)}
                  item={item}
                  onClickRow={handleRowClick(item)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <span>Hiển thị {tableData?.length ?? 0} mục</span>
        <div className="flex space-x-2">
          <button 
            onClick={props.onClickPrevious}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            disabled
          >
            Trước
          </button>
          <button 
            onClick={props.onClickNext}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
          >
            Tiếp
          </button>
        </div>
      </div>
    </div>
  );
};

export default VietnameseDataTable;