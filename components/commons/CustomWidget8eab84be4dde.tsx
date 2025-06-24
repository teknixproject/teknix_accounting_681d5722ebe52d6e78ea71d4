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
  onClickSelectAll?: MouseEventHandler<HTMLElement> | undefined;
  onClickSelectRow?: MouseEventHandler<HTMLElement> | undefined;
}

const TableHeader: React.FC<{
  isAllSelected: boolean;
  onSelectAll?: MouseEventHandler<HTMLElement>;
}> = ({ isAllSelected, onSelectAll }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={onSelectAll as any}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </th>
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

const TableRow: React.FC<{
  transaction: any;
  isSelected: boolean;
  onSelect?: (id: string) => void;
  onClickView?: MouseEventHandler<HTMLElement>;
}> = ({ transaction, isSelected, onSelect, onClickView }) => {
  const safeTransaction = transaction ?? {};
  const id = _.get(safeTransaction, 'id', '');
  const date = _.get(safeTransaction, 'date', '');
  const documentNumber = _.get(safeTransaction, 'documentNumber', '');
  const invoiceNumber = _.get(safeTransaction, 'invoiceNumber', '');
  const customer = _.get(safeTransaction, 'customer', '');
  const amount = _.get(safeTransaction, 'amount', 0);

  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  const handleCheckboxChange = () => {
    onSelect?.(id);
  };

  return (
    <tr className={`${isSelected ? 'bg-blue-50' : 'bg-white'} hover:bg-gray-50`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-blue-600 font-medium">{documentNumber}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {invoiceNumber}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
        <div className="truncate" title={customer}>
          {customer}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
        {formatAmount(amount)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="text-sm text-gray-500">-</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="text-sm text-gray-500">-</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="text-sm text-gray-500">-</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <button
          onClick={onClickView}
          className="text-blue-600 hover:text-blue-900 text-sm font-medium underline"
        >
          Xem
        </button>
      </td>
    </tr>
  );
};

const SummaryRow: React.FC<{ 
  total: number; 
  selectedCount: number; 
  totalCount: number;
}> = ({ total, selectedCount, totalCount }) => {
  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  return (
    <div className="bg-gray-50 px-6 py-4 border-t">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-900">Tổng</span>
          {selectedCount > 0 && (
            <span className="text-sm text-gray-600">({selectedCount}/{totalCount} được chọn)</span>
          )}
        </div>
        <span className="text-sm font-bold text-gray-900">{formatAmount(total)}</span>
      </div>
    </div>
  );
};

const TransactionTableWithCheckbox: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  onClickView,
  onClickSelectAll,
  onClickSelectRow,
  ...props
}) => {
  const safeItems = _.isArray(items) ? items : [
    {
      id: '1',
      date: '06/05/2025',
      documentNumber: 'BH00001',
      invoiceNumber: '',
      customer: 'CÔNG TY TNHH SẢN XUẤT THƯƠNG MẠI DỊCH VỤ BÌNH PHÚ',
      amount: 120000
    },
    {
      id: '2',
      date: '06/05/2025',
      documentNumber: 'BH00003',
      invoiceNumber: '2345',
      customer: 'CÔNG TY TNHH CÔNG NGHỆ BWF',
      amount: 1155000
    },
    {
      id: '3',
      date: '06/05/2025',
      documentNumber: 'BH00002',
      invoiceNumber: '',
      customer: 'CÔNG TY TNHH KỸ THUẬT CÔNG NGHỆ NGUYỄN THUẬN',
      amount: 820000
    },
    {
      id: '4',
      date: '',
      documentNumber: 'BDV00002',
      invoiceNumber: '',
      customer: 'CÔNG TY TNHH CÔNG NGHỆ BWF',
      amount: 220000
    },
    {
      id: '5',
      date: '07/05/2025',
      documentNumber: 'BDV00001',
      invoiceNumber: '',
      customer: 'CÔNG TY TNHH CÔNG NGHỆ BWF',
      amount: 530000
    }
  ];

  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const totalAmount = safeItems.reduce((sum, item) => {
    const amount = _.get(item, 'amount', 0);
    return sum + (_.isNumber(amount) ? amount : 0);
  }, 0);

  const isAllSelected = selectedItems.size === safeItems.length && safeItems.length > 0;
  const isIndeterminate = selectedItems.size > 0 && selectedItems.size < safeItems.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems(new Set());
    } else {
      const allIds = safeItems.map(item => _.get(item, 'id', ''));
      setSelectedItems(new Set(allIds));
    }
    onClickSelectAll?.(new Event('click') as any);
  };

  const handleSelectRow = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
    onClickSelectRow?.(new Event('click') as any);
  };

  const handleViewClick = (transaction: any) => (event: React.MouseEvent) => {
    onClickView?.(event);
  };

  return (
    <div id={id} style={style} className={`bg-white shadow-sm rounded-lg overflow-hidden ${className ?? ''}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader 
            isAllSelected={isAllSelected}
            onSelectAll={handleSelectAll as any}
          />
          <tbody className="bg-white divide-y divide-gray-200">
            {safeItems.map((transaction) => {
              const itemId = _.get(transaction, 'id', '');
              return (
                <TableRow
                  key={itemId}
                  transaction={transaction}
                  isSelected={selectedItems.has(itemId)}
                  onSelect={handleSelectRow}
                  onClickView={handleViewClick(transaction)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <SummaryRow 
        total={totalAmount} 
        selectedCount={selectedItems.size}
        totalCount={safeItems.length}
      />
    </div>
  );
};

export default TransactionTableWithCheckbox;