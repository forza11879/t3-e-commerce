import { useEffect } from "react"
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import UserNav from '@/components/nav/UserNav';

const HistoryPage: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const unauthenticated = status === "unauthenticated";

  useEffect(() => {
    if (unauthenticated) void router.push('/auth/signin')
  }, [unauthenticated, router])

  // const userOrdersUseQuery = useQueryUserOrders(token);

  // const showOrderInTable = (order) => (
  //   <table className="table table-bordered">
  //     <thead className="thead-light">
  //       <tr>
  //         <th scope="col">Title</th>
  //         <th scope="col">Price</th>
  //         <th scope="col">Brand</th>
  //         <th scope="col">Color</th>
  //         <th scope="col">Count</th>
  //         <th scope="col">Shipping</th>
  //       </tr>
  //     </thead>

  //     <tbody>
  //       {order.products.map((item, index) => (
  //         <tr key={index}>
  //           <td>
  //             <b>{item.product.title}</b>
  //           </td>
  //           <td>{item.product.price}</td>
  //           <td>{item.product.brand}</td>
  //           <td>{item.color}</td>
  //           <td>{item.count}</td>
  //           <td>
  //             {item.product.shipping === 'Yes' ? (
  //               <CheckCircleOutlined style={{ color: 'green' }} />
  //             ) : (
  //               <CloseCircleOutlined style={{ color: 'red' }} />
  //             )}
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );

  // const showEachOrders = () =>
  //   userOrdersUseQuery.data.reverse().map((item, index) => (
  //     <div key={index} className="m-5 p-3 card">
  //       <ShowPaymentInfo order={item} />
  //       {showOrderInTable(item)}
  //       <div className="row">
  //         <div className="col">{showDownloadLink(item)}</div>
  //       </div>
  //     </div>
  //   ));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center">
          <h4>User History</h4>

          {/* <h4>
            {userOrdersUseQuery.data.length > 0
              ? 'User purchase orders'
              : 'No purchase orders'}
          </h4> */}
          {/* {showEachOrders()} */}
        </div>
      </div>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   // const { req, res } = context;

//   const { appToken } = nookies.get(context);

//   try {
//     const { email } = await admin.auth().verifyIdToken(appToken);
//     const user = await currentUser(email);

//     // Using Hydration
//     const queryClient = new QueryClient();

//     await queryClient.prefetchQuery(userQueryKeys.userOrders(), async () => {
//       const userOrders = await findUserOrders(user._id);
//       return JSON.stringify(userOrders);
//     });

//     return {
//       props: {
//         token: appToken,
//         dehydratedState: dehydrate(queryClient),
//       }, // will be passed to the page component as props. always return an object with the props key
//     };
//   } catch (error) {
//     console.log(
//       'error Product getServerSideProps: ',
//       // error.errorInfo.message
//       error
//     );
//     if (error) {
//       return {
//         // notFound: true,
//         redirect: {
//           destination: '/login',
//           permanent: false,
//           // statusCode - In some rare cases, you might need to assign a custom status code for older HTTP Clients to properly redirect. In these cases, you can use the statusCode property instead of the permanent property, but not both.
//         },
//       };
//     }
//   }
// }

export default HistoryPage;
