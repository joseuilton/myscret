import HeaderVisitor from "../../components/HeaderVisitor";
import { FormAnswer } from "./FormAnswer";

export default function CreateAnswerForQuestion() {
  return (
    <>
      <HeaderVisitor />
      <main className="container px-7">
        <FormAnswer />
      </main>
    </>
  )
}