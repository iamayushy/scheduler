import { useContext, useState } from "react";
import Input from "../ui/input";
import { userContext } from "../../context/userContext";
import Button from "../ui/button";
import { sessionContext } from "../../context/sessionContext";
import DropDown from "../ui/dropDown";

export default function Form() {
  const { name } = useContext(userContext);
  const { sessions } = useContext(sessionContext);
  //   arbitrator: {
  //     name: string;
  //     email: string;
  //     id: string;
  // },
  // case: string;
  // claimant: string;
  // respondent: string;
  // date: Date;
  // startTime: string;
  // endTime: string;
  const [formData, setFormData] = useState({
    case: "",
    claimant: "",
    respondent: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  //   const handleForm = () => {

  //   }

  return (
    <div>
      <form>
        <div className="flex flex-col gap-4">
          <Input required readOnly label="Arbitrator" value={name} disabled />
          <Input required placeholder="sm-infinity" label="Case Number" />
          <Input
            required
            placeholder={`${new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}`}
            label="Date"
            info=""
          />
          <div className="flex items-center gap-4 justify-between">
            {/* <DropDown  options={[]} onChange={() => {}} selected={""}/>
            <DropDown options={[]} onChange={() => {}} selected={""}/> */}
          </div>
          <Input
            required
            type="email"
            placeholder="claimant@man.com"
            label="Claimant Email"
          />
          <Input
            required
            type="email"
            placeholder="respondent@tan.com"
            label="Respondent Email"
          />
          <Button>Create Session</Button>
        </div>
      </form>
    </div>
  );
}
