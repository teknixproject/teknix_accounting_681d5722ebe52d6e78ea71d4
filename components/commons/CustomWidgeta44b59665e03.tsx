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
  onClickEdit?: MouseEventHandler<HTMLElement> | undefined;
  onClickDelete?: MouseEventHandler<HTMLElement> | undefined;
  onClickRow?: MouseEventHandler<HTMLElement> | undefined;
  onClickPage?: MouseEventHandler<HTMLElement> | undefined;
}

const CustomerTable: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  onClickEdit,
  onClickDelete,
  onClickRow,
  onClickPage,
  ...props
}) => {
  const safeItems = _.isArray(items) ? items : [
    {
      customerCode: 'KH00001',
      customerName: 'CÔNG TY TNHH CÔNG NGHỆ BWF',
      address: '204-206 Võ Tòng Phan, Phường An Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam',
      taxCode: '0317992733',
      phone: '0916274654'
    },
    {
      customerCode: 'KH00003',
      customerName: 'CÔNG TY CỔ PHẦN 10 CHỨC ĐẠO TẠO WIT',
      address: '152/14 Thành Thái, Phường 12, Quận 10, Thành phố Hồ Chí Minh, Việt Nam',
      taxCode: '0316333568',
      phone: ''
    },
    {
      customerCode: 'KH00004',
      customerName: 'CÔNG TY TNHH KỸ THUẬT CÔNG NGHỆ NGUYÊN THUẤN',
      address: 'Số 201 Bông Sao, Phường 5, Quận 8, Thành phố Hồ Chí Minh, Việt Nam',
      taxCode: '0316501732',
      phone: ''
    },
    {
      customerCode: 'KH00002',
      customerName: 'CÔNG TY CỔ PHẦN CÔNG NGHỆ TEKNIX - CHI NHÁNH CẦN THƠ',
      address: 'Số 48 - 48B Bà Triệu, Phường Tân An, Quận Ninh Kiều, Thành phố Cần Thơ, Việt Nam',
      taxCode: '0316504814-001',
      phone: ''
    }
  ];

  const handleEditClick = (customer: any) => (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onClickEdit?.(event);
  };

  const handleDeleteClick = (customer: any) => (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onClickDelete?.(event);
  };

  const handleRowClick = (customer: any) => (event: React.MouseEvent<HTMLElement>) => {
    onClickRow?.(event);
  };

  const handlePageClick = (event: React.MouseEvent<HTMLElement>) => {
    onClickPage?.(event);
  };

  return (
    <div id={id} style={style} className={`w-full bg-white ${className ?? ''}`}>
      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 min-w-[100px]">
                Mã khách hàng
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 min-w-[200px]">
                Tên khách hàng
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 min-w-[300px]">
                Địa chỉ
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 min-w-[120px]">
                Mã số thuế
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 min-w-[100px]">
                Điện thoại
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 min-w-[120px]">
                Thao tác
              </th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {safeItems.map((customer, index) => {
              const safeCustomer = customer ?? {};
              const customerCode = _.get(safeCustomer, 'customerCode', '');
              const customerName = _.get(safeCustomer, 'customerName', '');
              const address = _.get(safeCustomer, 'address', '');
              const taxCode = _.get(safeCustomer, 'taxCode', '');
              const phone = _.get(safeCustomer, 'phone', '');

              return (
                <tr 
                  key={customerCode || index}
                  onClick={handleRowClick(customer)}
                  className="hover:bg-gray-50 cursor-pointer border-b"
                >
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                    {customerCode}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {customerName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 max-w-xs">
                    <div className="line-clamp-2">
                      {address}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {taxCode}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {phone}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center space-x-2">
                      {/* Edit Button */}
                      <button
                        onClick={handleEditClick(customer)}
                        className="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
                      >
                        Sửa
                      </button>
                      
                      {/* Delete Button */}
                      <button
                        onClick={handleDeleteClick(customer)}
                        className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                      >
                        Xoá
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end px-4 py-3 bg-white border-t">
        <div className="flex items-center space-x-2">
          {/* Page Number */}
          <button
            onClick={handlePageClick}
            className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-300 rounded-md hover:bg-blue-100"
          >
            1
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;