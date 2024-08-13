export const UsuariosTableSkeleton = () => {
  return (
    <div className="flex-auto p-1 my-2 border border-solid rounded-lg">
      <div className="p-0 overflow-x-auto">
        <table className="items-center w-full bg-white divide-y divide-gray-200 text-slate-500">
          {/* Cabecera */ }
          <thead className="align-bottom">
            <tr className="border-b border-gray-200">
              <th className="table-th text-left">Usuario</th>
              <th className="table-th text-left">Rol</th>
              <th className="table-th">Celular</th>
              <th className="table-th">Estado</th>
              <th className="table-th">ACTIONS</th>
            </tr>
          </thead>

          {/* Cuerpo */ }
          <tbody className="bg-white divide-y divide-gray-200">
            { [ ...Array( 4 ) ].map( ( _, index ) => (
              <tr key={ index } className="border-b ">
                <td className="table-td">
                  <div className="flex">
                    <div className="bg-gray-200/70 inline-flex items-center justify-center mr-4 h-9 w-9 rounded-full"></div>
                    <div className="flex flex-col justify-center">
                      <div className="h-4 bg-gray-200/70 rounded w-24 mb-1"></div>
                      <div className="h-3 bg-gray-200/70 rounded w-32"></div>
                    </div>
                  </div>
                </td>

                <td className="table-td">
                  <div className="h-4 bg-gray-200/70 rounded w-28"></div>
                </td>

                <td className="table-td text-center">
                  <div className="h-4 bg-gray-200/70 rounded w-20 mx-auto"></div>
                </td>

                <td className="table-td text-center">
                  <div className="h-4 bg-gray-200/70 rounded w-16 mx-auto"></div>
                </td>

                <td className="table-td text-center">
                  <div className="flex justify-center space-x-2">
                    { [ ...Array( 5 ) ].map( ( _, i ) => (
                      <div key={ i } className="h-8 w-8 bg-gray-200/70 rounded"></div>
                    ) ) }
                  </div>
                </td>
              </tr>
            ) ) }
          </tbody>
        </table>
      </div>
    </div>
  );
};
