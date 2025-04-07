import { useEffect, useState } from "react";
import { LoginButton } from "../../features/auth/ui/LoginButton";

export default function MainPage() {
  // const [rackId, setRackId] = useState()

  // useEffect(() => {
  //     const response = await fetch('XXXXXXXXXXXXXXXXXXXXXXXXXX')
  //     const data = await response.json()
  //     setRackId(data)

  //   fetchRacks()
  // }, [])

  return (
    <>
      <div>MainPage</div>
      <LoginButton />
    </>
  );
}
