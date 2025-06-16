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
  onClickDropdownOption?: MouseEventHandler<HTMLElement> | undefined;
  onClickRow?: MouseEventHandler<HTMLElement> | undefined;
}

const DropdownMenu: React.FC<{
  isOpen: boolean;
  onToggle: () => void;
  onOptionClick: (option: string) => void;
}> = ({ isOpen, onToggle, onOptionClick }) => {
  const options = [
    'Lập chứng từ bán hàng',
    'Lập phiếu chi tiền mặt',
    'Lập uỷ nhiệm chi',
    'Xem'
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={onToggle}
        className="inline-flex items-center justify-center text-blue-600 hover:text-blue-800 font-medium text-sm"
      >
        Lập chứng từ mua hàng
        <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => onOptionClick(option)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const TableRow: React.FC<{
  row: any;
  onDropdownOptionClick: (option: string, row: any) => void;
  onRowClick?: MouseEventHandler<HTMLElement>;
}> = ({ row, onDropdownOptionClick, onRowClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const safeRow = row ?? {};
  const trangThai = _.get(safeRow, 'trangThai', '');
  const kyHieu = _.get(safeRow, 'kyHieu', '');
  const ngayHoaDon = _.get(safeRow, 'ngayHoaDon', '');
  const soHoaDon = _.get(safeRow, 'soHoaDon', '');
  const nhaCungCap = _.get(safeRow, 'nhaCungCap', '');
  const maSoThue = _.get(safeRow, 'maSoThue', '');
  const tienHang = _.get(safeRow, 'tienHang', 0);
  const tienThue = _.get(safeRow, 'tienThue', 0);
  const tongTien = _.get(safeRow, 'tongTien', 0);

  const handleDropdownOptionClick = (option: string) => {
    onDropdownOptionClick(option, safeRow);
    setIsDropdownOpen(false);
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50" onClick={onRowClick}>
      <td className="px-4 py-3 text-sm text-gray-900">{trangThai}</td>
      <td className="px-4 py-3 text-sm text-gray-900">{kyHieu}</td>
      <td className="px-4 py-3 text-sm text-gray-900">{ngayHoaDon}</td>
      <td className="px-4 py-3 text-sm text-gray-900">{soHoaDon}</td>
      <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">{nhaCungCap}</td>
      <td className="px-4 py-3 text-sm text-gray-900">{maSoThue}</td>
      <td className="px-4 py-3 text-sm text-gray-900 text-right">{tienHang.toLocaleString()}</td>
      <td className="px-4 py-3 text-sm text-gray-900 text-right">{tienThue.toLocaleString()}</td>
      <td className="px-4 py-3 text-sm text-gray-900 text-right">{tongTien.toLocaleString()}</td>
      <td className="px-4 py-3 text-right">
        <DropdownMenu
          isOpen={isDropdownOpen}
          onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
          onOptionClick={handleDropdownOptionClick}
        />
      </td>
    </tr>
  );
};

const Pagination: React.FC<{ currentPage: number; onPageChange: (page: number) => void }> = ({
  currentPage,
  onPageChange
}) => {
  return (
    <div className="flex justify-center mt-4">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ‹
        </button>
        <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">{currentPage}</span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700"
        >
          ›
        </button>
      </div>
    </div>
  );
};

const InvoiceTable: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  onClickDropdownOption,
  onClickRow,
  ...props
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const safeItems = _.isArray(items) ? items : [
    {
      trangThai: 'C25TLN',
      kyHieu: '13/2/2025',
      ngayHoaDon: '13/2/2025',
      soHoaDon: '121',
      nhaCungCap: 'CÔNG TY TNHH MỘT THÀNH VIÊN THƯƠNG MẠI VÀ DỊCH VỤ LỚC NGHI',
      maSoThue: '1801280858',
      tienHang: 342593,
      tienThue: 27407,
      tongTien: 370000
    },
    {
      trangThai: 'C25MAA',
      kyHieu: '9/2/2025',
      ngayHoaDon: '9/2/2025',
      soHoaDon: '233639',
      nhaCungCap: 'CÔNG TY TNHH MM MEGA MARKET (VIỆT NAM)',
      maSoThue: '0302249586',
      tienHang: 1730892,
      tienThue: 145909,
      tongTien: 1876801
    },
    {
      trangThai: 'C25TRE',
      kyHieu: '4/4/2025',
      ngayHoaDon: '4/4/2025',
      soHoaDon: '218680',
      nhaCungCap: 'CHI NHÁNH THÀNH PHỐ HỒ CHÍ MINH - CÔNG TY CỔ PHẦN DI CHUYỂN XANH VÀ THÔNG MINH GSM',
      maSoThue: '0110269067-001',
      tienHang: 69444,
      tienThue: 5556,
      tongTien: 75000
    }
  ];

  const handleDropdownOptionClick = (option: string, row: any) => {
    console.log('Selected option:', option, 'for row:', row);
    if (_.isFunction(onClickDropdownOption)) {
      const mockEvent = { target: { value: option } } as any;
      onClickDropdownOption(mockEvent);
    }
  };

  const handleRowClick = (event: React.MouseEvent) => {
    onClickRow?.(event);
  };

  return (
    <div id={id} style={style} className={`bg-white ${className ?? ''}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái kiểm tra
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ký hiệu
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày hóa đơn
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số hóa đơn
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nhà cung cấp
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã số thuế
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tiền hàng
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tiền thuế
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tổng tiền thanh toán
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {safeItems.map((row, index) => (
              <TableRow
                key={index}
                row={row}
                onDropdownOptionClick={handleDropdownOptionClick}
                onRowClick={handleRowClick}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default InvoiceTable;