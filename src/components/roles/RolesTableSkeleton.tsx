export const RolesTableSkeleton = () => {
  return (
    <div className="flex-auto p-1 my-2 border border-solid rounded-lg">
      <div className="p-0 overflow-x-auto">
        <table className="items-center w-full bg-white divide-y divide-gray-200 text-slate-500">
          {/* Cabecera */}
          <thead>
            <tr className="shadow-sm">
              <th className="table-th text-left">ID</th>
              <th className="table-th text-left">Nombre</th>
              <th className="table-th text-left">Menus</th>
              <th className="table-th">Estado</th>
              <th className="table-th">Actions</th>
            </tr>
          </thead>

          {/* Cuerpo del Skeleton */}
          <tbody className="bg-white divide-y divide-gray-200">
            {[ ...Array( 4 ) ].map((_, index) => (
              <tr key={index} className="border-b animate-pulse">
                <td className="table-td">
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                </td>
                <td className="table-td">
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                </td>
                <td className="table-td">
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                </td>
                <td className="table-td text-center">
                  <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto"></div>
                </td>
                <td className="table-td text-center">
                  <div className="flex justify-center space-x-2">
                    { [ ...Array( 3 ) ].map( ( _, i ) => (
                      <div key={ i } className="h-8 w-8 bg-gray-200/70 rounded"></div>
                    ) ) }
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
