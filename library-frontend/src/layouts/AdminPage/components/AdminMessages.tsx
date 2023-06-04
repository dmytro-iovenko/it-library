import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { AdminMessage } from "./AdminMessage";
import { AdminMessageModel } from "../../../models/AdminMessageModel";
import { MessageModel } from "../../../models/MessageModel";
import { Pagination } from "../../Utils/Pagination";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import * as MessagesAPI from "../../../services/messages-api";

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
  const [totalMessages, setTotalMessages] = useState(0);

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
          if (
            resultData._embedded &&
            resultData._embedded.messages.length > 0 &&
            resultData.page
          ) {
            setMessages(resultData._embedded.messages);
            setTotalPages(resultData.page.totalPages);
            setTotalMessages(resultData.page.totalElements);
          } else {
            setMessages([]);
            setTotalPages(0);
            setTotalMessages(0);
          }
        })
        .then(() => setIsLoadingMessages(false))
        .catch((error: any) => {
          setHttpError(error.message);
          setIsLoadingMessages(false);
        });
  }, [authState, currentPage, messagesPerPage, btnSubmit]);

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

  async function submitResponseToQuestion(id: number, response: string) {
    const url = `http://localhost:8080/api/messages/secure/admin/message`;
    if (
      authState &&
      authState?.isAuthenticated &&
      id !== null &&
      response !== ""
    ) {
      const adminMessage: AdminMessageModel = new AdminMessageModel(
        id,
        response
      );
      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminMessage),
      };

      const adminMessageResponse = await fetch(url, requestOptions);
      if (!adminMessageResponse.ok) {
        throw new Error("Something went wrong!");
      }
      setBtnSubmit(!btnSubmit);
    }
  }

  return (
    <div className="mt-3">
      {messages.length > 0 ? (
        <>
          <h5>Pending Q/A ({totalMessages} messages): </h5>
          {messages.map((message) => (
            <AdminMessage
              message={message}
              key={message.id}
              submitResponseToQuestion={submitResponseToQuestion}
            />
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
