const TableCell = ({ data, key, action, childKey = "" }) => {
  if (!key) {
    return action ? action(data) : null;
  } else {
    const isObject = typeof data[key] === "object" && data[key] !== null;

    const content = isObject ? data[key][childKey] : data[key];

    return <h3 className="text-Gray">{content}</h3>;
  }
};

export const Table = (props) => {
  return (
      <div className="w-full overflow-hidden border rounded-md border-gray-300 md:rounded-lg">
        <table className="w-full divide-y divide-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {props.columns.map((item, index) => {
                return (
                  <th
                    key={index + 1}
                    scope="col"
                    className="py-4 px-5 text-sm font-medium text-left rtl:text-right text-gray-500 whitespace-nowrap"
                  >
                    {item.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-gray-50 !h-[80px]">
            {props.data?.map((item, index) => {
              return (
                <tr key={index}>
                  {props.columns.map((el, index) => {
                    return (
                      <td
                        onClick={() =>
                          props.onClickCard && props.onClickCard(item)
                        }
                        key={index}
                        className="px-5 py-3 text-xs whitespace-nowrap"
                      >
                        {TableCell({
                          data: item,
                          key: el.accessKey,
                          action: el.action,
                          childKey: el.childKey,
                        })}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  );
};
