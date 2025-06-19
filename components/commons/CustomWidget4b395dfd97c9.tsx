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
  onClickRow?: MouseEventHandler<HTMLElement>;
  onClickSort?: MouseEventHandler<HTMLElement>;
  onClickFilter?: MouseEventHandler<HTMLElement>;
}

const StockTable: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  onClickRow,
  onClickSort,
  onClickFilter,
  ...props
}) => {
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Sample data if none provided
  const defaultData = [
    {
      symbol: 'C32TLN',
      date: '13/3/2024',
      orderNumber: '121',
      companyName: 'CÔNG TY TNHH MỘT THÀNH VIÊN THƯƠNG MẠI VÀ DỊCH VỤ LỘC NGHỊ',
      taxCode: '1801288268',
      volume: '342,000',
      price: '27,407',
      totalValue: '370,000',
      changePercent: '1.50%',
      status: 'Lập chứng từ nhập dịch vụ',
      actions: 'Lập phiếu chi bán mất'
    },
    {
      symbol: 'C23MMA',
      date: '9/3/2024',
      orderNumber: '22NCM',
      companyName: 'CÔNG TY TNHH MIA MEDIA MARKET (VIỆT NAM)',
      taxCode: '0302649684',
      volume: '1,732,892',
      price: '145,900',
      totalValue: '1,878,861',
      changePercent: '1.86%',
      status: 'Lập quy nhận thu',
      actions: 'Xuất'
    },
    {
      symbol: 'C37RE',
      date: '4/4/2024',
      orderNumber: '21N60',
      companyName: 'CHỊ NHÀNH THÀNH PHỐ HỒ CHÍ MINH - CÔNG TY CỔ PHẦN DI CHUYỂN ANH VÀ THÔNG MINH GSIM',
      taxCode: '0110858687-001',
      volume: '69,444',
      price: '5,558',
      totalValue: '75,000',
      changePercent: '1.86%',
      status: 'Lập quy nhận thu',
      actions: 'Lập chứng từ mua hàng'
    }
  ];

  const tableData = _.isArray(items) && items.length > 0 ? items : defaultData;

  const handleSort = (field: string) => (event: React.MouseEvent) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
    onClickSort?.(event);
  };

  const handleRowClick = (rowData: any) => (event: React.MouseEvent) => {
    onClickRow?.(event);
  };

  const TableHeader: React.FC<{title: string, field: string}> = ({ title, field }) => (
    <th 
      className="px-3 py-2 text-left text-xs font-medium text-gray-700 border-r border-gray-200 cursor-pointer hover:bg-gray-50"
      onClick={handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{title}</span>
        {sortField === field && (
          <span className="text-blue-500">
            {sortDirection === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </div>
    </th>
  );

  return (
    <div id={id} style={style} className={`w-full bg-white ${className ?? ''}`}>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <TableHeader title="Trạng thái kiến tra" field="status" />
              <TableHeader title="Ký hiệu" field="symbol" />
              <TableHeader title="Ngày hóa đơn" field="date" />
              <TableHeader title="Số hóa đơn" field="orderNumber" />
              <TableHeader title="Nhà cung cấp" field="companyName" />
              <TableHeader title="Mã số thuế" field="taxCode" />
              <TableHeader title="Tiền hàng" field="volume" />
              <TableHeader title="Tiền thuế" field="price" />
              <TableHeader title="Tổng tiền thanh toán" field="totalValue" />
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 border-r border-gray-200 w-8">
                <div className="flex items-center justify-center">
                  <button className="w-4 h-4 flex items-center justify-center">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((row, index) => {
              const safeRow = row ?? {};
              const symbol = _.get(safeRow, 'symbol', '');
              const date = _.get(safeRow, 'date', '');
              const orderNumber = _.get(safeRow, 'orderNumber', '');
              const companyName = _.get(safeRow, 'companyName', '');
              const taxCode = _.get(safeRow, 'taxCode', '');
              const volume = _.get(safeRow, 'volume', '');
              const price = _.get(safeRow, 'price', '');
              const totalValue = _.get(safeRow, 'totalValue', '');
              const changePercent = _.get(safeRow, 'changePercent', '');
              const status = _.get(safeRow, 'status', '');
              const actions = _.get(safeRow, 'actions', '');

              return (
                <tr 
                  key={index}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={handleRowClick(safeRow)}
                >
                  <td className="px-3 py-2 border-r border-gray-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600 text-xs">{status}</span>
                      <button className="text-blue-600 hover:text-blue-800">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    <div className="text-blue-600 text-xs mt-1">{actions}</div>
                  </td>
                  <td className="px-3 py-2 border-r border-gray-200 font-medium">{symbol}</td>
                  <td className="px-3 py-2 border-r border-gray-200">{date}</td>
                  <td className="px-3 py-2 border-r border-gray-200">{orderNumber}</td>
                  <td className="px-3 py-2 border-r border-gray-200 max-w-xs truncate" title={companyName}>
                    {companyName}
                  </td>
                  <td className="px-3 py-2 border-r border-gray-200">{taxCode}</td>
                  <td className="px-3 py-2 border-r border-gray-200 text-right">{volume}</td>
                  <td className="px-3 py-2 border-r border-gray-200 text-right">{price}</td>
                  <td className="px-3 py-2 border-r border-gray-200 text-right font-medium">{totalValue}</td>
                  <td className="px-3 py-2 border-r border-gray-200 w-8">
                    <button className="w-full flex justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Hiển thị</span>
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span className="text-sm text-gray-600">bản ghi</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Trang 1 của 1</span>
          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 disabled:opacity-50">
              ‹
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
              1
            </button>
            <button className="px-2 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 disabled:opacity-50">
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTable;