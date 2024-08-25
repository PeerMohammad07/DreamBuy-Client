import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import toast from "react-hot-toast";
import { rootState } from "../../Redux/store/store";
import { useSelector } from "react-redux";
const ZegoServerSecret = import.meta.env.VITE_ZEGOCLOUD_SECRET;

const VideoCall = () => {
  const  userData = useSelector((state:rootState)=>  state.user.userData);
  const  sellerData  = useSelector((state: rootState) => state.seller.sellerData);
  const location = useLocation();
  const { senderId, recieverId,role } = useParams();
  const [uniqueId, setUniqueId] = useState("");
  const [userName, setUserName] = useState("");
  const myMeetingRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<any>(null); 

  useLayoutEffect(() => {
    console.log(location.pathname,"locationPathname")
    if (role=="seller"&&sellerData) {
      setUserName(sellerData?.name);
      setUniqueId(sellerData?._id);
    } else if(role=="user"&&userData){
      setUserName(userData.name);
      setUniqueId(userData?._id);
    }
  }, []);

  useEffect(() => {
    const myMeeting = async (element: HTMLDivElement) => {
      const appID = 859863771;
      const serverSecret = ZegoServerSecret;
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        (senderId as string) + recieverId,
        uniqueId,
        userName
      );

      const zegoCloud = ZegoUIKitPrebuilt.create(kitToken);
      zegoCloud.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: false,
      });

      // Store the ZegoCloud instance in the controllerRef
      controllerRef.current = zegoCloud;
    };

    if (myMeetingRef.current) {
      myMeeting(myMeetingRef.current);
    }
  }, [senderId, recieverId, userData?.name, uniqueId]);

  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.destroy();
      }
    };
  }, []);

  return uniqueId ? (
    <div
      className=""
      style={{ width: "100vw", height: "100vh" }}
      ref={myMeetingRef}
    ></div>
  ) : null;
};

export default VideoCall;