import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";

const funcionData = [
  {
    pathName: "electricity-rates",
    pageName: "Đơn giá điện",
  },
  {
    pathName: "home",
    pageName: "Trang chủ",
  },
  {
    pathName: "setting",
    pageName: "Cài đặt"
  },
];

const BreadCrumb = () => {
  const location = useLocation();

  const breadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);

    return (
      <Breadcrumb>
        {/* Always include Home as the first breadcrumb */}
        <Breadcrumb.Item>
          <Link to="/">Trang chủ</Link>
        </Breadcrumb.Item>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const matchedPage = funcionData.find(
            (data) => data.pathName === name
          );

          return (
            <Breadcrumb.Item key={index}>
              {/* Check if there's a matching pageName for the current pathName */}
              {matchedPage ? (
                <Link to={`${routeTo}`}>{matchedPage.pageName}</Link>
              ) : (
                name
              )}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    );
  };

  return (
    <div
      style={{
        padding: "16px 0",
      }}
      className="bg-[#f5f5f5] sticky top-[64px] z-10"
    >
      {breadCrumbView()}
    </div>
  );
};

export default BreadCrumb;

// import React from "react";
// import { useLocation, Link } from "react-router-dom";
// import { Breadcrumb } from "antd";

// const funcionData = [
//   {
//     pathName: "electricity-rates",
//     pageName: "Đơn giá điện",
//   },
//   {
//     pathName: "home",
//     pageName: "Trang chủ",
//   },
//   {
//     pathName: "setting",
//     pageName: "Cài đặt"
// },
// ];

// const BreadCrumb = () => {
//   const location = useLocation();
//   const breadCrumbView = () => {
//     const { pathname } = location;
//     const pathnames = pathname.split("/").filter((item) => item);
//     // const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
//     return (
//       <Breadcrumb>
//         {pathnames.length > 0 ? (
//           <Breadcrumb.Item>
//             <Link to="/">Home</Link>
//           </Breadcrumb.Item>
//         ) : (
//           <Breadcrumb.Item>Home</Breadcrumb.Item>
//         )}
//         {pathnames.map((name, index) => {
//           const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
//           const isLast = index === pathnames.length - 1;
//           return isLast ? (
//             <Breadcrumb.Item key={index}>{name}</Breadcrumb.Item>
//           ) : (
//             <Breadcrumb.Item key={index}>
//               <Link to={`${routeTo}`}>{name}</Link>
//             </Breadcrumb.Item>
//           );
//         })}
//       </Breadcrumb>
//     );
//   };

//   return (
//     <div
//       style={{
//         padding: "16px 0",
//       }}
//       className="bg-[#f5f5f5] sticky top-[64px]"
//     >
//       {breadCrumbView()}
//     </div>
//   );
// };

// export default BreadCrumb;
