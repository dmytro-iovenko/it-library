import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { MessageModel } from "../../../models/MessageModel";
import * as MessagesAPI from "../../../services/messages-api";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "../../Utils/Pagination";

export const AdminMessages = () => {
  // Normal Loading Pieces
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Messages endpoint State
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [messagesPerPage] = useState(5);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Recall useEffect
  const [btnSubmit, setBtnSubmit] = useState(false);

  const { authState } = useOktaAuth();
  const { num } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    Number(num) === 1 && navigate(`/admin/messages`);
    num && setCurrentPage(Number(num));
  }, [num, navigate]);

  useEffect(() => {
    authState &&
      authState?.isAuthenticated &&
      MessagesAPI.getMessagesByClosed(currentPage - 1, messagesPerPage)
        .then((resultData: any) => {
          console.log(resultData);
          if (
            resultData._embedded &&
            resultData._embedded.messages.length > 0 &&
            resultData.page
          ) {
            setMessages(resultData._embedded.messages);
            setTotalPages(resultData.page.totalPages);
          }
        })
        .then(() => setIsLoadingMessages(false))
        .catch((error: any) => {
          setHttpError(error.message);
          setIsLoadingMessages(false);
        });
  }, [currentPage, messagesPerPage]);

  if (isLoadingMessages) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className="mt-3">
      {messages.length > 0 ? (
        <>
          <h5>Pending Q/A: </h5>
          {messages.map((message) => (
            <p>Admin Message</p>
          ))}
        </>
      ) : (
        <h5>No pending Q/A</h5>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseURI={"admin/messages"}
        />
      )}
    </div>
  );
};
