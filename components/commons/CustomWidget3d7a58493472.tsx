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
  onClickView?: MouseEventHandler<HTMLElement> | undefined;
  onClickSelect?: MouseEventHandler<HTMLElement> | undefined;
}

const TransactionRow: React.FC<{
  transaction: any;
  onClickView?: MouseEventHandler<HTMLElement>;
  onClickSelect?: MouseEventHandler<HTMLElement>;
}> = ({ transaction, onClickView, onClickSelect }) => {
  const safeTransaction = transaction ?? {};
  const date = _.get(safeTransaction, 'date', '');
  const accountCode = _.get(safeTransaction, 'accountCode', '');
  const explanation = _.get(safeTransaction, 'explanation', '');
  const amount = _.get(safeTransaction, 'amount', 0);
  const assignee = _.get(safeTransaction, 'assignee', '');

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return dateString;
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="p-3">
        <input 
          type="checkbox" 
          className="rounded border-gray-300"
          onChange={onClickSelect}
        />
      </td>
      <td className="p-3 text-sm text-gray-700">
        {formatDate(date)}
      </td>
      <td className="p-3">
        <span className="text-blue-600 font-medium text-sm">
          {accountCode}
        </span>
      </td>
      <td className="p-3 text-sm text-gray-700">
        {explanation}
      </td>
      <td className="p-3 text-sm text-right font-medium">
        {formatAmount(amount)}
      </td>
      <td className="p-3 text-sm text-gray-700">
        {assignee}
      </td>
      <td className="p-3 text-center">
        <button
          onClick={onClickView}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Xem
        </button>
      </td>
    </tr>
  );
};

const TransactionSummary: React.FC<{ total: number }> = ({ total }) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  return (
    <tr className="bg-gray-50 font-medium">
      <td colSpan={4} className="p-3 text-sm text-gray-700">
        Tổng
      </td>
      <td className="p-3 text-sm text-right">
        {formatAmount(total)}
      </td>
      <td colSpan={2} className="p-3"></td>
    </tr>
  );
};

const TransactionTable: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  onClickView,
  onClickSelect,
  ...props
}) => {
  const safeItems = _.isArray(items) ? items : [
    {
      date: 'Fri Apr 25 2025',
      accountCode: 'XK00001',
      explanation: '',
      amount: 0,
      assignee: ''
    },
    {
      date: 'Sat Apr 26 2025',
      accountCode: 'NK00003',
      explanation: '12345678',
      amount: 600000,
      assignee: 'Duy Quang'
    },
    {
      date: 'Fri Apr 25 2025',
      accountCode: 'NK00001',
      explanation: 'Test',
      amount: 200000,
      assignee: 'Tuan Em'
    },
    {
      date: 'Fri Apr 25 2025',
      accountCode: 'NK00002',
      explanation: 'Test',
      amount: 300000,
      assignee: 'Duy Quang'
    }
  ];

  const total = safeItems.reduce((sum, item) => {
    const amount = _.get(item, 'amount', 0);
    return sum + (_.isNumber(amount) ? amount : 0);
  }, 0);

  const handleViewClick = (transaction: any) => (event: React.MouseEvent) => {
    onClickView?.(event);
  };

  const handleSelectClick = (transaction: any) => (event: React.MouseEvent) => {
    onClickSelect?.(event);
  };

  return (
    <div id={id} style={style} className={`bg-white rounded-lg shadow-sm ${className ?? ''}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300"
                />
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">
                Ngày hạch toán
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">
                Số chứng từ
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">
                Diễn giải
              </th>
              <th className="p-3 text-right text-sm font-medium text-gray-700">
                Tổng tiền
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">
                Người giao/người nhận
              </th>
              <th className="p-3 text-center text-sm font-medium text-gray-700">
              </th>
            </tr>
          </thead>
          <tbody>
            {safeItems.map((transaction, index) => (
              <TransactionRow
                key={`${_.get(transaction, 'accountCode', '')}-${index}`}
                transaction={transaction}
                onClickView={handleViewClick(transaction)}
                onClickSelect={handleSelectClick(transaction)}
              />
            ))}
            <TransactionSummary total={total} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;