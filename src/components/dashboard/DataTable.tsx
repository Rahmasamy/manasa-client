// components/dashboard/DataTable.tsx

export interface TableColumn<T> {
  key: keyof T;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
}


export function DataTable<T>({
  columns,
  data,
}: {
  columns: TableColumn<T>[];
  data: T[];
}) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)} className="text-right p-3">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-t">
            {columns.map((col) => (
              <td key={String(col.key)} className="p-3">
                {col.render
                  ? col.render(row[col.key], row)
                  : String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
