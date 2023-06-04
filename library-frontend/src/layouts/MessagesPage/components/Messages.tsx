import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { MessageModel } from "../../../models/MessageModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Pagination } from "../../Utils/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import * as MessagesAPI from "../../../services/messages-api";

export const Messages = () => {
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Messages
  const [messages, setMessages] = useState<MessageModel[]>([]);

  // Pagination
  const [messagesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0);

  const { authState } = useOktaAuth();
  const { num } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    Number(num) === 1 && navigate(`/messages`);
    num && setCurrentPage(Number(num));
  }, [num, navigate]);

  useEffect(() => {
    authState && authState?.isAuthenticated &&
      MessagesAPI.getMessagesByUserEmail(authState?.accessToken?.claims.sub, currentPage - 1, messagesPerPage)
        .then((resultData: any) => {
            console.log(resultData)
        if (
            resultData._embedded &&
            resultData._embedded.messages.length > 0 &&
            resultData.page
          ) {
            console.log(resultData)
            setMessages(resultData._embedded.messages);
            setTotalMessages(resultData.page.totalElements);
            setTotalPages(resultData.page.totalPages);
          }
        })
        .then(()=>setIsLoadingMessages(false))
        .catch((error: any) => {
          setHttpError(error.message);
          setIsLoadingMessages(false);
        });
  }, [authState, currentPage, messagesPerPage]);

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
    <div className="mt-2">
      {messages.length > 0 ? (
        <>
          <h5>Current Q/A ({totalMessages} messages): </h5>
          {messages.map((message) => (
            <div key={message.id}>
              <div className="card mt-3 mb-3 shadow p-3 bg-body rounded">
                <h5>
                  Case #{message.id}: {message.title}
                </h5>
                <h6>{message.userEmail}</h6>
                <p>{message.question}</p>
                <hr />
                <div>
                  <h5>Response: </h5>
                  {message.response && message.adminEmail ? (
                    <>
                      <h6>{message.adminEmail} (admin)</h6>
                      <p>{message.response}</p>
                    </>
                  ) : (
                    <p>
                      <i>
                        Pending response from administration. Please be patient.
                      </i>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h5>All questions you submit will be shown here</h5>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseURI={"messages"}
        />
      )}
    </div>
  );
};
