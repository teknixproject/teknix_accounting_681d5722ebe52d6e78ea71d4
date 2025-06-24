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
    <thead className="bg-gray-50 border-b">
      <tr>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">
          Ngày hóa đơn
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">
          Số hóa đơn
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">
          Mẫu số
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">
          Ký hiệu
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">
          Khách hàng
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">
          Mã số thuế
        </th>
        <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">
          Tiền hàng
        </th>
        <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">
          Tiền thuế
        </th>
        <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">
          Giá trị hóa đơn
        </th>
        <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
          
        </th>
      </tr>
    </thead>
  );
};

const InvoiceRow: React.FC<{
  invoice: any;
  isEven: boolean;
  onClickRow?: MouseEventHandler<HTMLElement>;
  onClickAction?: MouseEventHandler<HTMLElement>;
}> = ({ invoice, isEven, onClickRow, onClickAction }) => {
  const invoiceDate = _.get(invoice, 'invoiceDate', '');
  const invoiceNumber = _.get(invoice, 'invoiceNumber', '');
  const templateNumber = _.get(invoice, 'templateNumber', '');
  const symbol = _.get(invoice, 'symbol', '');
  const customerName = _.get(invoice, 'customerName', '');
  const taxCode = _.get(invoice, 'taxCode', '');
  const amount = _.get(invoice, 'amount', 0);
  const taxAmount = _.get(invoice, 'taxAmount', 0);
  const totalAmount = _.get(invoice, 'totalAmount', 0);

  const bgColor = isEven ? 'bg-white' : 'bg-gray-50';

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  return (
    <tr 
      className={`${bgColor} hover:bg-blue-50 transition-colors duration-150 border-b border-gray-100 cursor-pointer`}
      onClick={onClickRow}
    >
      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-100">
        {invoiceDate}
      </td>
      <td className="px-4 py-3 text-sm text-blue-600 font-medium border-r border-gray-100">
        {invoiceNumber}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-100">
        {templateNumber}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-100">
        {symbol}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-100 max-w-xs">
        <div className="truncate" title={customerName}>
          {customerName}
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-900 font-mono border-r border-gray-100">
        {taxCode}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium border-r border-gray-100">
        {formatNumber(amount)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium border-r border-gray-100">
        {formatNumber(taxAmount)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900 text-right font-bold border-r border-gray-100">
        {formatNumber(totalAmount)}
      </td>
      <td className="px-4 py-3 text-center">
        <div className="relative">
          <button
            onClick={onClickAction}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
          >
            <span>Lập chứng từ kết nộp.Sửa</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

const SummaryBar: React.FC<{
  totalInvoices: number;
  totalAmount: number;
  totalTax: number;
  totalValue: number;
}> = ({ totalInvoices, totalAmount, totalTax, totalValue }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg shadow-lg mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-blue-100 text-sm">Tổng số hóa đơn</p>
          <p className="text-2xl font-bold">{totalInvoices}</p>
        </div>
        <div className="text-center">
          <p className="text-blue-100 text-sm">Tổng tiền hàng</p>
          <p className="text-xl font-semibold">{formatNumber(totalAmount)}</p>
        </div>
        <div className="text-center">
          <p className="text-blue-100 text-sm">Tổng tiền thuế</p>
          <p className="text-xl font-semibold">{formatNumber(totalTax)}</p>
        </div>
        <div className="text-center">
          <p className="text-blue-100 text-sm">Tổng giá trị</p>
          <p className="text-2xl font-bold">{formatNumber(totalValue)}</p>
        </div>
      </div>
    </div>
  );
};

const SearchAndFilter: React.FC<{
  onSearch?: (term: string) => void;
  onDateFilter?: (startDate: string, endDate: string) => void;
  onClickExport?: MouseEventHandler<HTMLElement>;
}> = ({ onSearch, onDateFilter, onClickExport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleDateFilter = () => {
    onDateFilter?.(startDate, endDate);
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm theo số hóa đơn, khách hàng..."
              value={searchTerm}
              onChange={handleSearch}
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
          onClick={onClickExport}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Xuất Excel</span>
        </button>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">Lọc theo ngày:</span>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-gray-500">đến</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleDateFilter}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
};

const InvoiceManagement: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const defaultInvoices = [
    {
      id: 1,
      invoiceDate: '7/2/2025',
      invoiceNumber: '00000001',
      templateNumber: 'C22TEC',
      symbol: 'CÔNG TY TNHH TEXNIKA E&C',
      customerName: 'CÔNG TY TNHH TEXNIKA E&C',
      taxCode: '0310391960',
      amount: 1233333,
      taxAmount: 246667,
      totalAmount: 1480000
    },
    {
      id: 2,
      invoiceDate: '13/2/2025',
      invoiceNumber: '121',
      templateNumber: 'C22TLN',
      symbol: 'CÔNG TY TNHH MỘT THÀNH VIÊN THƯƠNG MẠI VÀ DỊCH VỤ LỐC NGHI',
      customerName: 'CÔNG TY TNHH MỘT THÀNH VIÊN THƯƠNG MẠI VÀ DỊCH VỤ LỐC NGHI',
      taxCode: '1801580658',
      amount: 342593,
      taxAmount: 27407,
      totalAmount: 370000
    }
  ];

  const safeItems = _.isArray(items) && items.length > 0 ? items : defaultInvoices;
  const invoices = _.get(data, 'invoices', safeItems);

  const filteredInvoices = _.filter(invoices, (invoice) => {
    if (!searchTerm) return true;
    const searchFields = [
      _.get(invoice, 'invoiceNumber', ''),
      _.get(invoice, 'customerName', ''),
      _.get(invoice, 'taxCode', '')
    ];
    return searchFields.some(field => 
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalInvoices = filteredInvoices.length;
  const totalAmount = _.sumBy(filteredInvoices, 'amount');
  const totalTax = _.sumBy(filteredInvoices, 'taxAmount');
  const totalValue = _.sumBy(filteredInvoices, 'totalAmount');

  const handleRowClick = (invoice: any) => (event: React.MouseEvent) => {
    props.onClickInvoice?.(event);
  };

  const handleActionClick = (invoice: any) => (event: React.MouseEvent) => {
    event.stopPropagation();
    props.onClickAction?.(event);
  };

  return (
    <div id={id} style={style} className={`w-full max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen ${className ?? ''}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý hóa đơn</h1>
        <p className="text-gray-600">Theo dõi và quản lý các hóa đơn bán hàng</p>
      </div>

      <SummaryBar
        totalInvoices={totalInvoices}
        totalAmount={totalAmount}
        totalTax={totalTax}
        totalValue={totalValue}
      />

      <SearchAndFilter
        onSearch={setSearchTerm}
        onClickExport={props.onClickExport}
      />

      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <TableHeader />
            <tbody>
              {filteredInvoices.map((invoice: any, index: number) => (
                <InvoiceRow
                  key={_.get(invoice, 'id', index)}
                  invoice={invoice}
                  isEven={index % 2 === 0}
                  onClickRow={handleRowClick(invoice)}
                  onClickAction={handleActionClick(invoice)}
                />
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center">
                    <div className="text-gray-500">
                      <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707v11a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-lg font-medium">Không có hóa đơn nào</p>
                      <p className="text-sm">Không tìm thấy hóa đơn phù hợp với điều kiện tìm kiếm</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
        <span>Hiển thị {filteredInvoices.length} hóa đơn</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={props.onClickPrint}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>In báo cáo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceManagement;