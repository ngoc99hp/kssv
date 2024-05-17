const SkeletonTable = ({m,n}) => {
    return (
      <>
        {[...Array(m)].map((_, i) => (
          <tr key={i}>
            {[...Array(n)].map((_,ii) => (
              <td key={ii}>
                <>
                  <div className="skeleton h-5 w-full"></div>
                </>
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  };

export default SkeletonTable;