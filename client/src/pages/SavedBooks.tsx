import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import type { User } from '../models/User';

const SavedBooks = () => {
  // Execute the GET_ME query to load the user data
  const { loading, error, data, refetch } = useQuery(GET_ME);
  // Set up the REMOVE_BOOK mutation
  const [removeBookMutation] = useMutation(REMOVE_BOOK);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (error) return <h2>Error: {error.message}</h2>;
  if (!data || !data.me) return <h2>No user data found.</h2>;
  // Destructure userData from the query response
  const userData: User = data.me;
  //const userData: User = data?.me || {};

  // Function to handle deleting a book using the REMOVE_BOOK mutation
  const handleDeleteBook = async (bookId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      // Execute the REMOVE_BOOK mutation with the book's ID
      await removeBookMutation({
        variables: { bookId },
      });
      // Optionally, refetch the GET_ME query to update the UI with the new user data
      refetch();
      // Upon success, remove the book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => (
            <Col md="4" key={book.bookId}>
              <Card border="dark">
                {book.image && (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                )}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors.join(', ')}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;





// import { useState, useEffect } from 'react';
// import { Container, Card, Button, Row, Col } from 'react-bootstrap';

// import { getMe, deleteBook } from '../utils/API';
// import Auth from '../utils/auth';
// import { removeBookId } from '../utils/localStorage';
// import type { User } from '../models/User';

// const SavedBooks = () => {
//   const [userData, setUserData] = useState<User>({
//     username: '',
//     email: '',
//     password: '',
//     savedBooks: [],
//   });

//   // use this to determine if `useEffect()` hook needs to run again
//   const userDataLength = Object.keys(userData).length;

//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const token = Auth.loggedIn() ? Auth.getToken() : null;

//         if (!token) {
//           return false;
//         }

//         const response = await getMe(token);

//         if (!response.ok) {
//           throw new Error('something went wrong!');
//         }

//         const user = await response.json();
//         setUserData(user);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     getUserData();
//   }, [userDataLength]);

//   // create function that accepts the book's mongo _id value as param and deletes the book from the database
//   const handleDeleteBook = async (bookId: string) => {
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const response = await deleteBook(bookId, token);

//       if (!response.ok) {
//         throw new Error('something went wrong!');
//       }

//       const updatedUser = await response.json();
//       setUserData(updatedUser);
//       // upon success, remove book's id from localStorage
//       removeBookId(bookId);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // if data isn't here yet, say so
//   if (!userDataLength) {
//     return <h2>LOADING...</h2>;
//   }

//   return (
//     <>
//       <div className='text-light bg-dark p-5'>
//         <Container>
//           {userData.username ? (
//             <h1>Viewing {userData.username}'s saved books!</h1>
//           ) : (
//             <h1>Viewing saved books!</h1>
//           )}
//         </Container>
//       </div>
//       <Container>
//         <h2 className='pt-5'>
//           {userData.savedBooks.length
//             ? `Viewing ${userData.savedBooks.length} saved ${
//                 userData.savedBooks.length === 1 ? 'book' : 'books'
//               }:`
//             : 'You have no saved books!'}
//         </h2>
//         <Row>
//           {userData.savedBooks.map((book) => {
//             return (
//               <Col md='4'>
//                 <Card key={book.bookId} border='dark'>
//                   {book.image ? (
//                     <Card.Img
//                       src={book.image}
//                       alt={`The cover for ${book.title}`}
//                       variant='top'
//                     />
//                   ) : null}
//                   <Card.Body>
//                     <Card.Title>{book.title}</Card.Title>
//                     <p className='small'>Authors: {book.authors}</p>
//                     <Card.Text>{book.description}</Card.Text>
//                     <Button
//                       className='btn-block btn-danger'
//                       onClick={() => handleDeleteBook(book.bookId)}
//                     >
//                       Delete this Book!
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             );
//           })}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default SavedBooks;
