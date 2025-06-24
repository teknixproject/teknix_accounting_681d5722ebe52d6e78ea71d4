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
  onClickView?: MouseEventHandler<HTMLElement> | undefined;
  onClickExport?: MouseEventHandler<HTMLElement> | undefined;
  onClickFilter?: MouseEventHandler<HTMLElement> | undefined;
}

const TransactionTableHeader: React.FC = () => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Ngày hạch toán
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Số chứng từ
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Số hoá đơn
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Khách hàng
        </th>
        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          Tổng tiền thanh toán
        </th>
        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
          TT lập hoá đơn
        </th>
        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
          TT thanh toán
        </th>
        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
          TT xuất hàng
        </th>
        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
          Số phiếu xuất
        </th>
      </tr>
    </thead>
  );
};

const TransactionRow: React.FC<{
  transaction: any;
  onClickView?: MouseEventHandler<HTMLElement>;
}> = ({ transaction, onClickView }) => {
  const safeTransaction = transaction ?? {};
  const date = _.get(safeTransaction, 'date', '');
  const documentNumber = _.get(safeTransaction, 'documentNumber', '');
  const invoiceNumber = _.get(safeTransaction, 'invoiceNumber', '');
  const customer = _.get(safeTransaction, 'customer', '');
  const amount = _.get(safeTransaction, 'amount', 0);
  const invoiceStatus = _.get(safeTransaction, 'invoiceStatus', '');
  const paymentStatus = _.get(safeTransaction, 'paymentStatus', '');
  const exportStatus = _.get(safeTransaction, 'exportStatus', '');
  const exportNumber = _.get(safeTransaction, 'exportNumber', '');

  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  return (
    <tr className="bg-white hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-blue-600 font-medium">{documentNumber}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {invoiceNumber}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
        {customer}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
        {formatAmount(amount)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="text-sm text-gray-500">{invoiceStatus}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="text-sm text-gray-500">{paymentStatus}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="text-sm text-gray-500">{exportStatus}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <button
          onClick={onClickView}
          className="text-blue-600 hover:text-blue-900 text-sm font-medium"
        >
          Xem
        </button>
      </td>
    </tr>
  );
};

const TransactionSummary: React.FC<{ total: number }> = ({ total }) => {
  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  return (
    <div className="bg-gray-50 px-6 py-4 border-t">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-900">Tổng</span>
        <span className="text-sm font-bold text-gray-900">{formatAmount(total)}</span>
      </div>
    </div>
  );
};

const TransactionTable: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  onClickView,
  onClickExport,
  onClickFilter,
  ...props
}) => {
  const safeItems = _.isArray(items) ? items : [
    {
      date: '06/05/2025',
      documentNumber: 'BH00001',
      invoiceNumber: '',
      customer: 'CÔNG TY TNHH SẢN XUẤT THƯƠNG MẠI DỊCH VỤ BÌNH PHÚ',
      amount: 120000,
      invoiceStatus: '',
      paymentStatus: '',
      exportStatus: '',
      exportNumber: ''
    },
    {
      date: '06/05/2025',
      documentNumber: 'BH00003',
      invoiceNumber: '2345',
      customer: 'CÔNG TY TNHH CÔNG NGHỆ BWF',
      amount: 1165000,
      invoiceStatus: '',
      paymentStatus: '',
      exportStatus: '',
      exportNumber: ''
    },
    {
      date: '06/05/2025',
      documentNumber: 'BH00002',
      invoiceNumber: '',
      customer: 'CÔNG TY TNHH KỸ THUẬT CÔNG NGHỆ NGUYỄN THUẬN',
      amount: 520000,
      invoiceStatus: '',
      paymentStatus: '',
      exportStatus: '',
      exportNumber: ''
    },
    {
      date: '',
      documentNumber: 'BUV00002',
      invoiceNumber: '',
      customer: 'CÔNG TY TNHH CÔNG NGHỆ BWF',
      amount: 220000,
      invoiceStatus: '',
      paymentStatus: '',
      exportStatus: '',
      exportNumber: ''
    },
    {
      date: '07/05/2025',
      documentNumber: 'BUV00001',
      invoiceNumber: '',
      customer: 'CÔNG TY TNHH CÔNG NGHỆ BWF',
      amount: 500000,
      invoiceStatus: '',
      paymentStatus: '',
      exportStatus: '',
      exportNumber: ''
    }
  ];

  const totalAmount = safeItems.reduce((sum, item) => {
    const amount = _.get(item, 'amount', 0);
    return sum + (_.isNumber(amount) ? amount : 0);
  }, 0);

  const handleViewClick = (transaction: any) => (event: React.MouseEvent) => {
    onClickView?.(event);
  };

  return (
    <div id={id} style={style} className={`bg-white shadow-sm rounded-lg overflow-hidden ${className ?? ''}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TransactionTableHeader />
          <tbody className="bg-white divide-y divide-gray-200">
            {safeItems.map((transaction, index) => (
              <TransactionRow
                key={_.get(transaction, 'documentNumber', index)}
                transaction={transaction}
                onClickView={handleViewClick(transaction)}
              />
            ))}
          </tbody>
        </table>
      </div>
      <TransactionSummary total={totalAmount} />
    </div>
  );
};

export default TransactionTable;