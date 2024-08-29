import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionUserHome() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <span className='font-bold text-xl mr-2 text-black'>Q - </span>How can I find an appropriate property?
        </AccordionSummary>
        <AccordionDetails>
          To find an appropriate property, use our search filters to narrow down your options based on location, type, price range, and other preferences. You can also view properties on the map and get suggestions based on your location.
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <span className='font-bold text-xl mr-2 text-black'>Q - </span>How can I contact the seller?
        </AccordionSummary>
        <AccordionDetails>
          You can contact the seller directly through our platform by using the chat feature or scheduling a video call. Alternatively, you can request the owner's contact details via email.
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <span className='font-bold text-xl mr-2 text-black'>Q - </span> How can I sell my property?
        </AccordionSummary>
        <AccordionDetails>
          To sell your property, you can list it on our platform for free or choose a premium listing for increased visibility. Follow the prompts to enter your property details and upload images. Our platform will help you manage and promote your listing effectively.
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
