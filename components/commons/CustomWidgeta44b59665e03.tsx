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
  onClickRow?: MouseEventHandler<HTMLElement> | undefined;
  onClickPrevious?: MouseEventHandler<HTMLElement> | undefined;
  onClickNext?: MouseEventHandler<HTMLElement> | undefined;
  onClickPage?: MouseEventHandler<HTMLElement> | undefined;
}

const InvoiceTable: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  onClickRow,
  onClickPrevious,
  onClickNext,
  onClickPage,
  ...props
}) => {
  const safeItems = _.isArray(items) ? items : [
    {
      status: 'C25TLN',
      symbol: '13/2/2025',
      invoiceNumber: '121',
      supplier: 'CÔNG TY TNHH MỘT THÀNH VIÊN THƯƠNG MẠI VÀ DỊCH VỤ LỐC NGHI'
    },
    {
      status: 'C25MAA',
      symbol: '9/2/2025',
      invoiceNumber: '233639',
      supplier: 'CÔNG TY TNHH MM MEGA MARKET (VIỆT NAM)'
    },
    {
      status: 'C25TBE',
      symbol: '4/4/2025',
      invoiceNumber: '218680',
      supplier: 'CHI NHÁNH THÀNH PHỐ HỒ CHÍ MINH - CÔNG TY CỔ PHẦN DI CHUYỂN XANH VÀ THÔNG'
    }
  ];

  const handleRowClick = (invoice: any) => (event: React.MouseEvent) => {
    onClickRow?.(event);
  };

  const handlePreviousClick = (event: React.MouseEvent) => {
    onClickPrevious?.(event);
  };

  const handleNextClick = (event: React.MouseEvent) => {
    onClickNext?.(event);
  };

  const handlePageClick = (event: React.MouseEvent) => {
    onClickPage?.(event);
  };

  return (
    <div id={id} style={style} className={`w-full bg-white ${className ?? ''}`}>
      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Trạng thái kiểm tra
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Ký hiệu
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Ngày hóa đơn
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Số hoá đơn
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Nhà cung cấp
              </th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {safeItems.map((invoice, index) => {
              const safeInvoice = invoice ?? {};
              const status = _.get(safeInvoice, 'status', '');
              const symbol = _.get(safeInvoice, 'symbol', '');
              const invoiceNumber = _.get(safeInvoice, 'invoiceNumber', '');
              const supplier = _.get(safeInvoice, 'supplier', '');

              return (
                <tr 
                  key={index}
                  onClick={handleRowClick(invoice)}
                  className="hover:bg-gray-50 cursor-pointer border-b"
                >
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {status}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {symbol}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {/* Note: The date appears to be in the symbol column in the image */}
                    {symbol}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {invoiceNumber}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 max-w-md truncate">
                    {supplier}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={handlePreviousClick}
            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            disabled={true}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Page Number */}
          <button
            onClick={handlePageClick}
            className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-300 rounded-md hover:bg-blue-100"
          >
            1
          </button>
          
          {/* Next Button */}
          <button
            onClick={handleNextClick}
            className="p-2 text-gray-600 hover:text-gray-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gray-400 h-2 rounded-full" style={{ width: '30%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;