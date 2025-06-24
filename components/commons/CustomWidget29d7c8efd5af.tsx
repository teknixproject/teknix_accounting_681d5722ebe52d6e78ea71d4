/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
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
  onClickRow?: MouseEventHandler<HTMLElement> | undefined;
}

const TableRow: React.FC<{
  item: any;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onClickView?: MouseEventHandler<HTMLElement>;
}> = ({ item, isSelected, onSelect, onClickView }) => {
  const safeItem = item ?? {};
  const date = _.get(safeItem, 'date', '');
  const documentNumber = _.get(safeItem, 'documentNumber', '');
  const description = _.get(safeItem, 'description', '');
  const amount = _.get(safeItem, 'amount', 0);
  const assignee = _.get(safeItem, 'assignee', '');
  const id = _.get(safeItem, 'id', '');

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(id)}
          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">{date}</td>
      <td className="px-4 py-3">
        <span className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
          {documentNumber}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">{description}</td>
      <td className="px-4 py-3 text-sm text-gray-900 text-right">
        {amount > 0 ? formatAmount(amount) : ''}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">{assignee}</td>
      <td className="px-4 py-3">
        <button
          onClick={onClickView}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          Xem
        </button>
      </td>
    </tr>
  );
};

const TableHeader: React.FC<{
  isAllSelected: boolean;
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ isAllSelected, onSelectAll }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-4 py-3 text-left">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={onSelectAll}
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
        </th>
        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Ngày hạch toán</th>
        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Số chứng từ</th>
        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Diễn giải</th>
        <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Tổng tiền</th>
        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
          Người giao/người nhận
        </th>
        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900"></th>
      </tr>
    </thead>
  );
};

const TableSummary: React.FC<{ total: number }> = ({ total }) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  return (
    <tfoot className="bg-gray-50">
      <tr>
        <td className="px-4 py-3"></td>
        <td className="px-4 py-3 text-sm font-medium text-gray-900">Tổng</td>
        <td className="px-4 py-3"></td>
        <td className="px-4 py-3"></td>
        <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
          {formatAmount(total)}
        </td>
        <td className="px-4 py-3"></td>
        <td className="px-4 py-3"></td>
      </tr>
    </tfoot>
  );
};

const DocumentTable: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  onClickView,
  onClickSelectAll,
  onClickRow,
  ...props
}) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const safeItems = _.isArray(items)
    ? items
    : [
        {
          id: '1',
          date: 'Fr Apr 25 2025',
          documentNumber: 'Xút0001',
          description: '',
          amount: 0,
          assignee: '',
        },
        {
          id: '2',
          date: 'Sat Apr 26 2025',
          documentNumber: 'Nr00003',
          description: '12344078',
          amount: 600000,
          assignee: 'Duy Quang',
        },
        {
          id: '3',
          date: 'Fr Apr 25 2025',
          documentNumber: 'Nr00001',
          description: 'Test',
          amount: 200000,
          assignee: 'Tuấn Em',
        },
        {
          id: '4',
          date: 'Fr Apr 25 2025',
          documentNumber: 'Nr00002',
          description: 'Test',
          amount: 300000,
          assignee: 'Duy Quang',
        },
      ];

  const totalAmount = safeItems.reduce((sum, item) => {
    const amount = _.get(item, 'amount', 0);
    return sum + (typeof amount === 'number' ? amount : 0);
  }, 0);

  const handleSelectItem = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedItems.size === safeItems.length) {
      setSelectedItems(new Set());
    } else {
      const allIds = safeItems.map((item) => _.get(item, 'id', ''));
      setSelectedItems(new Set(allIds));
    }
    onClickSelectAll?.(event as any);
  };

  const isAllSelected = selectedItems.size === safeItems.length && safeItems.length > 0;

  return (
    <div id={id} style={style} className={className}>
      <table className="min-w-full divide-y divide-gray-200">
        <TableHeader isAllSelected={isAllSelected} onSelectAll={handleSelectAll} />
        <tbody>
          {safeItems.map((item: any) => (
            <TableRow
              key={item.id}
              item={item}
              isSelected={selectedItems.has(item.id)}
              onSelect={handleSelectItem}
              onClickView={onClickView}
            />
          ))}
        </tbody>
        <TableSummary total={totalAmount} />
      </table>
    </div>
  );
};

export default DocumentTable;
