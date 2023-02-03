import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";
import Moment from "react-moment";
import { SmallAvatar } from "../../../Common/CustomStyleComponents";
import 'moment/locale/ru';
// moment.locale('ru');

export type DataMessage = {
  currentUser: boolean,
  message: string,
  imgSrc: string,
  timeOfCreateMassage: number,
}


export function TimeAgo({ time }: { time: number }): ReactElement {

  const messageData = new Date(time)
  return (
    <>
      <Box display='flex' alignItems='center' mt={1} sx={{ gap: '5px', fontSize: 12 }}>
        <Moment fromNow ago>{messageData}</Moment>
        <Typography sx={{ fontSize: 12 }}>назад</Typography>
      </Box>
    </>

  );
}









function Message(props: { dataMessage: DataMessage }): ReactElement {

  const { dataMessage } = props;

  // подфунция получения времени сообщения
  function createMinutes(data: number) {
    const currentData = Date.now()
    const messageData = new Date(data)
    console.log(messageData)
    const result = `${messageData.getDate()}/${messageData.getMonth()}/${messageData.getFullYear()} ${messageData.getHours()}:${messageData.getMinutes()}`
    console.log(result)
    const minutes = Math.ceil((currentData - data) / 60000)
    return minutes

  }



  return (
    <Box padding={1} display='flex' sx={{ flexDirection: "column" }}>
      <Box display='flex' marginTop={1} sx={{ flexDirection: `${dataMessage.currentUser ? 'row-reverse' : 'row'}` }}>
        <SmallAvatar alt="image" src={dataMessage.imgSrc} />
        <Typography
          sx={{
            margin: '0 10px',
            borderRadius: '10px',
            backgroundColor: `${dataMessage.currentUser ? '#1876f9' : '#c1c3c7'}`,
            color: `${dataMessage.currentUser ? 'white' : 'black'}`,
            padding: 1,
            hyphens: 'auto',
            maxWidth: '65%',
            wordBreak: 'break-word',
            // wordWrap: 'break-word',

          }}
        >
          {dataMessage.message}
        </Typography>
      </Box>
      <Box display='flex' sx={{ fontSize: 14, flexDirection: `${dataMessage.currentUser ? 'row-reverse' : 'row'}` }}>
      <TimeAgo time={dataMessage.timeOfCreateMassage} />
        {/* {createMinutes(dataMessage.timeOfCreateMassage)} минут назад */}
      </Box>
    </Box>
  );
}


export default Message;

























