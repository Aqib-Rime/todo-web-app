import { useAtom } from "jotai";
import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import NavBar from "./components/NavBar";
import TodoList from "./components/TodoList";
import { currentUserId, isLoggedIn } from "./jotaiStore/loggedInInfo";
import { Todo } from "./typings";


const Home: NextPage = () => {
  const [loggedIn] = useAtom(isLoggedIn)
  const [currentId] = useAtom(currentUserId)
  let todos : Todo[] | undefined = []

  if (loggedIn) {
    todos = trpc.todo.getTodoList.useQuery({id: currentId }).data?.todos
    if (!todos) {
      todos = []
    }
  }

  return <div>
    <NavBar />
    {/* <ShowToDoList userId /> */}
    {loggedIn ? <div><TodoList todos={todos} /></div> : <div>Others</div>}
  </div>;
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
