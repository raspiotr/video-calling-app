import {
  User,
  StreamVideoClient,
  useCall,
  useCallStateHooks,
  CallingState,
  StreamVideo,
  StreamCall,
} from "@stream-io/video-react-sdk";

const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiTHVtaW5hcmFfVW5kdWxpIiwiaXNzIjoiaHR0cHM6Ly9wcm9udG8uZ2V0c3RyZWFtLmlvIiwic3ViIjoidXNlci9MdW1pbmFyYV9VbmR1bGkiLCJpYXQiOjE3MDQxOTcwMzEsImV4cCI6MTcwNDgwMTgzNn0.16d6TlfMOklG4RLPHTW6_pWKeGCee7pFv-1EawD_FI0";
const userId = "Luminara_Unduli";
const callId = "MkrFQ2Jq7NXo";

const user: User = {
  id: userId,
  name: "Piotr",
  image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", callId);
call.join({ create: true });

export const MyUILayout = () => {
  const call = useCall();

  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Call "{call?.id}" has {participantCount} participants.
    </div>
  );
};

export default function App() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}
