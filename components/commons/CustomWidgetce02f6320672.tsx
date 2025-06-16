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
  onClickCreateSalesDocument?: MouseEventHandler<HTMLElement> | undefined;
  onClickCreateServiceDocument?: MouseEventHandler<HTMLElement> | undefined;
  onClickView?: MouseEventHandler<HTMLElement> | undefined;
  onClickExportXML?: MouseEventHandler<HTMLElement> | undefined;
}

const InvoiceTableRow: React.FC<{
  invoice: any;
  onDropdownSelect?: (action: string, invoice: any) => void;
}> = ({ invoice, onDropdownSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const safeInvoice = invoice ?? {};
  const invoiceDate = _.get(safeInvoice, 'date', '');
  const invoiceNumber = _.get(safeInvoice, 'number', '');
  const series = _.get(safeInvoice, 'series', '');
  const symbol = _.get(safeInvoice, 'symbol', '');
  const customer = _.get(safeInvoice, 'customer', '');
  const taxCode = _.get(safeInvoice, 'taxCode', '');
  const totalAmount = _.get(safeInvoice, 'totalAmount', 0);
  const taxAmount = _.get(safeInvoice, 'taxAmount', 0);
  const finalAmount = _.get(safeInvoice, 'finalAmount', 0);

  const handleDropdownSelect = (action: string) => {
    onDropdownSelect?.(action, safeInvoice);
    setIsDropdownOpen(false);
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-3 text-sm">{invoiceDate}</td>
      <td className="px-4 py-3 text-sm">{invoiceNumber}</td>
      <td className="px-4 py-3 text-sm">{series}</td>
      <td className="px-4 py-3 text-sm">{symbol}</td>
      <td className="px-4 py-3 text-sm max-w-xs truncate" title={customer}>{customer}</td>
      <td className="px-4 py-3 text-sm">{taxCode}</td>
      <td className="px-4 py-3 text-sm text-right">{totalAmount?.toLocaleString('vi-VN')}</td>
      <td className="px-4 py-3 text-sm text-right">{taxAmount?.toLocaleString('vi-VN')}</td>
      <td className="px-4 py-3 text-sm text-right">{finalAmount?.toLocaleString('vi-VN')}</td>
      <td className="px-4 py-3 text-sm relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="text-blue-600 hover:text-blue-800 underline focus:outline-none"
        >
          Lập chứng từ bán hàng
          <svg className="inline-block ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <div className="py-1">
              <button
                onClick={() => handleDropdownSelect('createSales')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Lập chứng từ bán hàng
              </button>
              <button
                onClick={() => handleDropdownSelect('createService')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Lập chứng từ bán dịch vụ
              </button>
              <button
                onClick={() => handleDropdownSelect('view')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Xem
              </button>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

const InvoiceTable: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  onClickCreateSalesDocument,
  onClickCreateServiceDocument,
  onClickView,
  onClickExportXML,
  ...props
}) => {
  const safeItems = _.isArray(items) ? items : [
    {
      id: 1,
      date: '7/2/2025',
      number: '00000001',
      series: 'C2BTEC',
      symbol: 'CÔNG TY TNHH TEKNIK E&C',
      customer: 'CÔNG TY TNHH TEKNIK E&C',
      taxCode: '0314266140',
      totalAmount: 3633333,
      taxAmount: 363667,
      finalAmount: 3492000
    },
    {
      id: 2,
      date: '13/2/2025',
      number: '121',
      series: 'C2BTL4',
      symbol: 'CÔNG TY TNHH MÔI TRƯỜNG VIỆN THƯƠNG MẠI VÀ DỊCH VỤ LỘC SINH',
      customer: 'CÔNG TY TNHH MÔI TRƯỜNG VIỆN THƯƠNG MẠI VÀ DỊCH VỤ LỘC SINH',
      taxCode: '1801386958',
      totalAmount: 342999,
      taxAmount: 27467,
      finalAmount: 370000
    }
  ];

  const handleDropdownSelect = (action: string, invoice: any) => {
    const event = new MouseEvent('click') as any;
    
    switch (action) {
      case 'createSales':
        onClickCreateSalesDocument?.(event);
        break;
      case 'createService':
        onClickCreateServiceDocument?.(event);
        break;
      case 'view':
        onClickView?.(event);
        break;
    }
  };

  const handleExportXML = (event: React.MouseEvent) => {
    onClickExportXML?.(event);
  };

  return (
    <div id={id} style={style} className={`bg-white ${className ?? ''}`}>
      <div className="flex justify-between items-center p-4">
        <div className="flex space-x-2">
          {/* Placeholder for other buttons */}
        </div>
        <button
          onClick={handleExportXML}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Nhập XML
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Ngày hóa đơn
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Số hóa đơn
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Mẫu số
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Ký hiệu
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Khách hàng
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Mã số thuế
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Tiền hàng
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Tiền thuế
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Giá trị hóa đơn
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                {/* Empty header for dropdown column */}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {safeItems.map((invoice, index) => (
              <InvoiceTableRow
                key={_.get(invoice, 'id', index)}
                invoice={invoice}
                onDropdownSelect={handleDropdownSelect}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center py-4">
        <nav className="flex items-center space-x-2">
          <button
            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
            disabled
          >
            ‹
          </button>
          <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded">
            1
          </button>
          <button
            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700"
          >
            ›
          </button>
        </nav>
      </div>
    </div>
  );
};

export default InvoiceTable;