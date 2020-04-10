import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Divider,
  Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 600,
    maxHeight: '95%',
    overflowY: 'auto',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    padding: '24px 36px',
    overflow: 'auto'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  header: {
    marginTop: 20,
    marginBottom: 3
  },
  subheader: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 3
  },
  bold: {
    fontWeight: 'bold'
  },
  italic: {
    fontStyle: 'italic'
  }
}));

function TermsModal({
  open, onClose, className, ...rest
}) {
  const classes = useStyles();

  if (!open) {
    return null;
  }

  return (
    <Modal
      onClose={onClose}
      open={open}
    >
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardHeader title="TERMS ADN CONDITIONS" />
        <Divider />
        <CardContent className={classes.content}>
          <Typography className={classes.bold} variant="body1">
            These TERMS AND CONDITIONS shall apply any agreements and/or legal relationships between Udevia ltd and Customer resulting therefrom or in connection therewith. Any amendments to the TERMS AND CONDITIONS are only legally binding between Parties, if both Parties have expressly agreed to such amendments in writing. 
            <br/>
            <br/>
            Udevia ltd is a company incorporated and registered in Gibraltar (Provider) 
          </Typography>

          <Typography className={clsx(classes.bold, classes.header)} variant="h3">
            General terms
          </Typography>
          <Typography variant="body1">
            This agreement shall begin on the date the Customer accepted the terms of the agreement and shall continue indefinitely unless terminated in accordance with the terms of this agreements 
            <br/>
            <br/>
            The Provider agrees to provide services described in the order for the fees stated in the order 
            <br/>
            <br/> 
            The Customer agrees to pay the agreed price to the Provider and to provide necessary assistance to the Provider. The Customer represents and warrants to the Provider that the information he, she or it has provided and will provide to the Provider for purposes of establishing and maintaining the service is accurate. If the Customer is an individual, the Customer represents and warrants to the Provider that he or she is at least 18 years of age. 
            The specification of the services governed by this agreement is described in the Services Specification based on the description as it stands on the Effective Date. The Provider may modify products and services from time-to-time. Should the description of services change subsequent to the Effective Date, the Provider has no obligation to modify services to reflect such a change. 
            <br/>
            <br/> 
            The Customer acknowledges that all intellectual property rights in the service and any modification belong and shall belong to the Provider, and the Customer shall have no rights in or to the service other than the right to use it in accordance with the terms of this agreement. 
            <br/>
            <br/> 
            The Provider will not be held responsible for any breach by the User of provisions that restrict or forbid the access or use of the services offered by the Provider. The User, solely and exclusively, bears the entire responsibility in regard to the access to and use of the services, in compliance with the conditions imposed by his national legislation or the ones in effect on the territory where he activates, as well as in compliance with the dispositions applicable in the relation with third parties that handle the data and information obtained from the Provider.
            <br/>
            <br/> 
            Any natural or legal person that is legally forbidden by public authorities to perform or undertake activities similar to the ones that constitute the object of the Services of the Provider, or the results thereof, may not be a Customer.
            <br/>
            <br/> 
            The legal use of the services is entirely the responsibility of the Customer. In case the Provider establishes that the Customer breached any legal or administrative dispositions in regard to the right to use the services, it may definitively suspend/close the account of that Customer, who will then have to pay for any damages occurred.
            <br/>
            <br/> 
            Complete or partial use of the services may be limited or forbidden by certain legislations, under specific jurisdictions, or by certain providers of goods and services. The Customer integrally and exclusively assumes that he is the only person completely responsible for breaching any restrictions or interdictions established for the use of the services, integrally taking upon himself any damages requested by third parties.
            <br/>
            <br/> 
            The Customer integrally ascertains the fact that the Provider does not have the obligation to analyze and inform him in regard to restrictions, incompatibilities, limitations, types of conducts, from a moral or legal point of view and that may be imposed by regulations, legal provisions, administrative norms, terms and conditions imposed by third parties, public or private
            <br/>
            <br/> 
            The Provider does not guarantee to the Customer complete accuracy of services and neither does it guarantee any specific financial result following the exclusive use of the services by the Customer. The Provider is not responsible to analyze and make decisions for the Customer in regard to the options it proposes through its services, even if the Customer exclusively bases his actions on the services of the Provider.
            <br/>
            <br/> 
            The Provider reserves the right to make changes to these terms at any time. To the extent the Provider is able, the Provider will give the Customer advance notice of these changes. If these changes materially affect the Customer's ability to use services, the Customer may terminate this agreement within 30 days of such a change. Otherwise, the Customer's continued use of the service is the Customer's consent to be bound by the changes. 
            <br/>
            <br/> 
            In the case of conflict or ambiguity between any provision contained in the body of this agreement and any provision contained in other documents, the provision in the body of this agreement shall take precedence. 
            <br/>
            <br/> 
            Questions about the terms of this agreement will be answered at e-mail address xxx@xxxx.com 
          </Typography>
          <Typography className={clsx(classes.bold, classes.header)} variant="h3">
            Payment
          </Typography>
          <Typography variant="body1">
            The Provider may require payment before beginning service 
            <br/>
            <br/> 
            The Customer is fully responsible for the accuracy and completeness of all data (such as change in billing or mailing address) and timely notification of changes of these details. The Provider is not responsible for any misunderstanding resulting from failure to notify of these changes by the Customer.
            <br/>
            <br/> 
            The Provider may increase its fees for services, if such a change notifies the customer at least thirty (30) days prior to the effective date of new fees. The Customer is entitled to terminate this Agreement with effect from the fee change. If the Customer does not give a notice of non-renewal, the Customer shall be deemed to have accepted the new fee. 
            <br/>
            <br/> 
            The Customer doesn't have the right to hold back any payment from the Provider in case of service or availability problems. 
            The Customer acknowledges that the amount of the fee for the service is based on the Customer's agreement to pay the fee for the entire initial service term, or renewal term, as applicable. 
            <br/>
            <br/> 
            All charges are non-refundable unless expressly stated otherwise, or otherwise provided by applicable law. 
            <br/>
            <br/> 
            If the Customer believes that there is an error in calculation of the fee, the Customer has the right claim settlement prices for the service. 
          </Typography>
          <Typography className={clsx(classes.bold, classes.header)} variant="h3">
            Provider's warranties and limits of liability
          </Typography>
          <Typography variant="body1">
            The Provider warrants that the service will conform in all technical respects to the specification. Given the nature of the service, the Provider cannot warrant, and is under no circumstances responsible for, any outcome from using the service. 
            <br/>
            <br/>
            If the Customer notifies the Provider in writing of any defect or fault in the service in consequence of which it fails to conform in all technical respects to the specification, and such defect or fault does not result from the Customer, or anyone acting with the authority of the Customer, having used the service outside the terms of this agreement, for a purpose or in a context other than the purpose or context for which it was designed, the Provider shall, at the Provider's option, do one of the following: a) replace the service; or b) repair the service; or c) terminate this agreement immediately by notice in writing to the Customer.
            <br/>
            <br/>
            As the Customers payment for the service is a direct result of the Customers income from the service, the Provider is not liable for any refunds of any kind. 
            <br/>
            <br/>
            The Customer agrees that the Provider shall not be responsible for unauthorized access to or alteration of the Customer's data. The Provider disclaims any and all warranties regarding services provided by third parties, regardless of whether those services appear to be provided by the Provider. 
            <br/>
            <br/>
            The Customer represents and warrants to the Provider that has the experience and knowledge necessary to use services and will provide the Provider with material that may be implemented by the Provider to provide services without extra effort on its part. 
            <br/>
            <br/>
            The Provider does not guarantee to the Customer complete accuracy of services and neither does it guarantee any specific financial result following the exclusive use of the services by the Customer. The Provider is not responsible to analyze and make decisions for the Customer in regard to the options it proposes through its services, even if the Customer exclusively bases his actions on the services of the Provider.
            <br/>
            <br/>
            The Provider shall have no liability for any losses or damages which may be suffered by the Customer (or any person claiming under or through the Customer), whether the same are suffered directly or indirectly or are immediate or consequential, and whether the same arise in contract, tort (including negligence) or otherwise howsoever, which fall within any of the following categories: a) special damage even though the Provider was aware of the circumstances in which such special damage could arise; b) loss of profits; c) loss of business opportunity; d) loss of goodwill; e) loss of data. 
            <br/>
            <br/>
            The Customer agrees that, in entering into this agreement, either it did not rely on any representations (whether written or oral) of any kind or of any person other than those expressly set out in this agreement or (if it did rely on any representations, whether written or oral, not expressly set out in this agreement) that it shall have no remedy in respect of such representations and (in either case) the Provider shall have no liability otherwise than pursuant to the express terms of this agreement. 
            <br/>
            <br/>
            No party shall be liable to the other for any delay or non-performance of its obligations under this agreement arising from any cause beyond its control (force majeure) including, without limitation, any of the following: act of God, governmental act, significant failure of a portion of the power grid, significant failure of the Internet, natural disaster, war, flood, explosion, riot, insurrection, epidemic, strikes or other organized labor action, terrorist activity, or other events of a magnitude or type for which precautions are not generally taken in the industry. For the avoidance of doubt, nothing in this clause shall excuse the Customer from any payment obligations under this agreement. 
            <br/>
            <br/>
            All other conditions, warranties or other terms which might have effect between the parties or be implied or incorporated into this agreement or any collateral contract, whether by statute, common law or otherwise, are hereby excluded, including, without limitation, the implied conditions, warranties or other terms as to satisfactory quality, fitness for purpose or the use of reasonable skill and care. 
          </Typography>
          <Typography className={clsx(classes.bold, classes.header)} variant="h3">
            Termination
          </Typography>
          <Typography variant="body1">
            Either party may terminate this agreement at any time on written notice to the other if the other: a) is in material or persistent breach of any of the terms of this agreement and either that breach is incapable of remedy, or the other party fails to remedy that breach within 30 days after receiving written notice requiring it to remedy that breach; or b) is unable to pay its debts, or becomes insolvent, or is subject to an order or a resolution for its liquidation, administration, winding-up or dissolution (otherwise than for the purposes of a solvent amalgamation or reconstruction), or has an administrative or other receiver, manager, trustee, liquidator, administrator or similar officer appointed over all or any substantial part of its assets, or enters into or proposes any composition or arrangement with its creditors generally, or is subject to any analogous event or proceeding in any applicable jurisdiction. 
            <br/>
            <br/>
            Notwithstanding the previous clause, the Provider may at any time terminate this agreement for any reason by giving written notice to the Customer, whereas the Customer may terminate this agreement by giving 30 days' notice in writing to the Provider if it wishes to stop using the service. 
            <br/>
            <br/>
            The Customer agrees that the Provider may suspend services to the Customer without notice and without liability if: a) the Provider reasonably believes that the services are being used in violation of the this agreement; b) the Provider reasonably believes that the suspension of service is necessary to protect its network or its other customers; c) as requested by a law enforcement or regulatory agency; or d) the Customer failures to pay fees due. The Customer shall pay the Provider's reasonable reinstatement fee if service is reinstituted following a suspension of service under this subsection. 
            <br/>
            <br/>
            On termination for any reason: a) all rights granted to the Customer under this agreement shall cease; b) the Customer shall cease all activities authorised by this agreement; c) the Customer shall immediately pay to the Provider any sums due to the Provider under this agreement. 
          </Typography>
          <Typography className={clsx(classes.bold, classes.header)} variant="h3">
            Data protection 
          </Typography>
          <Typography variant="body1">
            The Customer acknowledges that the Provider processes personal data, as defined under the relevant data protection laws, of the users of the service for the purpose of complying with its obligations under this agreement. 
            <br/>
            <br/>
            The Customer hereby warrants that it has the consent of the users to disclose their personal data to the Provider for the purpose of using the service and that for the same purpose the users have agreed that their personal data may be transferred to territories outside the EEA. 
            <br/>
            <br/>
            The Provider will take all steps reasonably necessary to ensure that personal data is treated securely. 
            <br/>
            <br/>
            The Customer agrees that the Provider may, without notice to the Customer, report to the appropriate authorities any conduct by the Customer or any of the Customer's customers or end users that the Provider believes violates applicable law, and provide any information that it has about the Customer or any of its customers or end users in response to a formal or informal request from a law enforcement or regulatory agency or in response to a formal request in a civil action that on its face meets the requirements for such a request. 
            <br/>
            <br/>
            The Provider shall not disclose any data to third parties, but may process such data in duly anonymised and aggregated form for purposes such as internal statistics, commercial sale and promotion. 
            <br/>
            <br/>
            Each party shall, during the term of this agreement and thereafter, keep confidential all, and shall not use for its own purposes (unless in accordance with aforementioned clause) nor without the prior written consent of the other disclose to any third party, any information of a confidential nature (including, without limitation, trade secrets and information of commercial value) which may become known to such party from the other party and which relates to the other party, unless such information is public knowledge or already known to such party at the time of disclosure, or subsequently becomes public knowledge other than by breach of this agreement, or subsequently comes lawfully into the possession of such party from a third party. The provisions of this clause shall remain in full force and effect for 1 year after the termination of this agreement for any reason.
          </Typography>
          <Typography className={clsx(classes.bold, classes.header)} variant="h3">
            Indemnification
          </Typography>
          <Typography variant="body1">
            The Customer agree to indemnify, hold harmless and defend the Provider from and against any and all claims, damages, losses, liabilities, suits, actions, demands, proceedings (whether legal or administrative), and expenses (including, but not limited to, reasonable attorney's fees) threatened, asserted, or filed by a third party against any of the indemnified parties arising out of or relating to the Customer's breach of any term or condition of this agreement, the Customer's use of the service, any violation by the Customer of any of the Provider's policies, and/or any acts or omissions by the Customer. In such a case, the Provider will provide the Customer with written notice of such claim, suit or action. The Customer shall cooperate as fully as reasonably required in the defense of any claim. The Provider reserves the right, at its own expense, to assume the exclusive defense and control of any matter subject to indemnification by the Customer. 
          </Typography>
          <Typography className={clsx(classes.bold, classes.header)} variant="h3">
            Compliance 
          </Typography>
          <Typography variant="body1">
            The Customer will not use the service in any way or for any purpose that would violate, or would have the effect of violating, any applicable laws, rules or regulations or any rights of any third parties, including without limitation, any law or right regarding any copyright, patent, trademark, trade secret, music, image, or other 
            <br/>
            <br/>
            proprietary or property right, false advertising, unfair competition, defamation, invasion of privacy or rights of celebrity. 
          </Typography>
          <Typography className={clsx(classes.bold, classes.header)} variant="h3">
            Waiver  
          </Typography>
          <Typography variant="body1">
            No forbearance or delay by either party in enforcing its rights shall prejudice or restrict the rights of that party, and no waiver of any such rights or of any breach of any contractual terms shall be deemed to be a waiver of any other right or of any later breach. 
          </Typography>
          <Typography className={clsx(classes.bold, classes.header)} variant="h3">
            Severability   
          </Typography>
          <Typography variant="body1">
            In the event that any of the terms of this agreement become or are declared to be illegal or otherwise unenforceable, such term(s) shall be null and void and shall be deemed deleted from this agreement. All remaining terms of this agreement shall remain in full force and effect. Notwithstanding the foregoing, if this paragraph becomes applicable and, as a result, the value of this agreement is materially impaired for either party, as determined by such party in its sole discretion, then the affected party may terminate this agreement by written notice to the other. 
          </Typography>
          <Typography className={clsx(classes.bold, classes.header)} variant="h3">
            No Agency    
          </Typography>
          <Typography variant="body1">
            This agreement does not create any agency, partnership, joint venture, or franchise relationship. Neither party has the right or authority to, and shall not, assume or create any obligation of any nature whatsoever on behalf of the other party or bind the other party in any respect whatsoever. 
          </Typography>
          <Typography className={clsx(classes.bold, classes.header)} variant="h3">
            Third party rights    
          </Typography>
          <Typography variant="body1">
            No term of this agreement is intended to confer a benefit on, or to be enforceable by, any person who is not a party to this agreement. 
          </Typography>
          <Typography className={clsx(classes.bold, classes.header)} variant="h3">
            Notices    
          </Typography>
          <Typography variant="body1">
            Any notice required to be given pursuant to this agreement shall be in writing, and shall be sent to the other party by first-class mail or e-mail. 
          </Typography>
          <Typography className={clsx(classes.bold, classes.header)} variant="h3">
            Entire agreement     
          </Typography>
          <Typography variant="body1">
            This agreement in so far as it describes the specification, contain the whole agreement between the parties relating to the subject matter hereof and supersede all prior agreements, arrangements and understandings between the parties relating to that subject matter. 
          </Typography>
          <Typography className={clsx(classes.bold, classes.header)} variant="h3">
            Governing law and jurisdiction      
          </Typography>
          <Typography variant="body1">
            This agreement, its subject matter or its formation (including non-contractual disputes or claims) shall be governed by and construed in accordance with Gibraltar law and submitted to the non-exclusive jurisdiction of the Gibraltar courts. 
          </Typography>
          <Typography className={classes.bold} variant="body1">
            This Privacy Policy shall apply any agreements and/or legal relationships between Udevia ltd and Customer resulting therefrom or in connection therewith. 
          </Typography>
          <Typography className={classes.italic} variant="body1">
            As required by law, the Provider shall process personal data safely and only for the specified purposes.
            <br/>
            <br/>
          </Typography>
          <Typography variant="body1">
            The protection of personal data is a priority for the Provider. Storage of the personal data of Users shall be done exclusively for the purpose of providing the Services by the Provider and in order to exercise due rights.
          </Typography>
          <Typography className={classes.subheader} variant="body1">
            Definitions
          </Typography>
          <Typography variant="body1">
            a) ‘Personal data’ means any information relating to an identified or identifiable natural person (‘data subject’); an identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person;
            <br/>
            <br/>
            b) ‘processing’ means any operation or set of operations which is performed on personal data or on sets of personal data, whether or not by automated means, such as collection, recording, organisation, structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, restriction, erasure or destruction;
            <br/>
            <br/>
            c) ‘restriction of processing’ means the marking of stored personal data with the aim of limiting their processing in the future;
            <br/>
            <br/>
            d) ‘profiling’ means any form of automated processing of personal data consisting of the use of personal data to evaluate certain personal aspects relating to a natural person, in particular to analyze or predict aspects concerning that natural person’s performance at work, economic situation, health, personal preferences, interests, reliability, behavior, location or movements;
            <br/>
            <br/>
            e) ‘pseudonymisation’ means the processing of personal data in such a manner that the personal data can no longer be attributed to a specific data subject without the use of additional information, provided that such additional information is kept separately and is subject to technical and organizational measures to ensure that the personal data are not attributed to an identified or identifiable natural person;
            <br/>
            <br/>
            f) ‘filing system’ means any structured set of personal data which are accessible according to specific criteria, whether centralised, decentralised or dispersed on a functional or geographical basis;
            <br/>
            <br/>
            g) ‘controller’ means the natural or legal person, public authority, agency or other body which, alone or jointly with others, determines the purposes and means of the processing of personal data; where the purposes and means of such processing are determined by Union or Member State law, the controller or the specific criteria for its nomination may be provided for by Union or Member State law;
            <br/>
            <br/>
            h) ‘processor’ means a natural or legal person, public authority, agency or other body which processes personal data on behalf of the controller;
            <br/>
            <br/>
            i) ‘recipient’ means a natural or legal person, public authority, agency or another body, to which the personal data are disclosed, whether a third party or not. However, public authorities which may receive personal data in the framework of a particular inquiry in accordance with Union or Member State law shall not be regarded as recipients; the processing of those data by those public authorities shall be in compliance with the applicable data protection rules according to the purposes of the processing;
            <br/>
            <br/>
            j) ‘third party’ means a natural or legal person, public authority, agency or body other than the data subject, controller, processor and persons who, under the direct authority of the controller or processor, are authorized to process personal data;
            <br/>
            <br/>
            k) ‘consent of the data subject’ means any freely given, specific, informed and unambiguous indication of the data subject’s wishes by which he or she, by a statement or by a clear affirmative action, signifies agreement to the processing of personal data relating to him or her; ‘enterprise’ means a natural or legal person engaged in an economic activity, irrespective of its legal form, including partnerships or associations regularly engaged in an economic activity;
            <br/>
            <br/>
            l) ‘supervisory authority’ means an independent public authority which is established by a Member State pursuant to Article 51 of Regulation no. 679/2016;
            <br/>
            <br/>
            m) ‘cross-border processing’ means either:
            (a) processing of personal data which takes place in the context of the activities of establishments in more than one Member State of a controller or processor in the Union where the controller or processor is established in more than one Member State; or (b) processing of personal data which takes place in the context of the activities of a single establishment of a controller or processor in the Union but which substantially affects or is likely to substantially affect data subjects in more than one Member State.
            <br/>
            <br/>
            n) ‘personal data breach’ means a breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorized disclosure of, or access to, personal data transmitted, stored or otherwise processed.
          </Typography>
          <Typography className={classes.subheader} variant="body1">
            Collecting Personal Data
          </Typography>
          <Typography variant="body1">
            1. The Provider collects, stores, processes and uses the personal data provided by the Customer on registration (name, surname, place of residence, date of birth, email address etc), only if it is relevant and only if necessary to close and execute the agreement between Provider and Customer and so that the Provider comply with its legal obligations, exclusively based on the consent of the data subject.
            <br/>
            <br/>
            2. The collected personal data shall only be used in compliance with the declared purposes. The collected personal data shall not be made public, sold, leased or transfered. However, the Provider will transmit the personal data to its authorized contractors to be processed for the specified purposes, as in the case of bank card or other processors.
            <br/>
            <br/>
            3. The Provider may disclose personal data on request by competent public organizations/institutions in specific cases provided by the effectual regulations.
            <br/>
            <br/>
            4. Data subjects will be informed explicitly by the available online means that their personal data will be processed, the purpose and the duration of the processing, as well as in regard to the rights they have concerning the collecting, processing and storing of that data. In general, the personal data will be collected directly from the data subject.
          </Typography>
          <Typography className={classes.subheader} variant="body1">
            Logging in to the Web Page of the Company
          </Typography>
          <Typography variant="body1">
            5. The Server Log Files of the Web Page store the information automatically provided by the computer of the Customer, such as: the browser version used, the operating system used, the URL (previously visited page), the IP address, the time the server was accessed.
          </Typography>
          <Typography className={classes.subheader} variant="body1">
            User Rights
          </Typography>
          <Typography variant="body1">
            6. The right to have access and information: the right to get from the Provider the confirmation that it processes Personal Data, as well as information concerning processing details, such as: purpose, personal data categories processed, data recipient, data storage duration, the existence of right to rectify, erase, or restrict the processing.
            <br/>
            <br/>
            7. The right to make changes, or rectify data: the right to rectify, update, block, erase or restrict the unlawful processing of data, on demand and for free, especially in cases of incomplete and inaccurate data.
            <br/>
            <br/>
            8. The right to erase: the right to request the erasing of personal data when it is no longer necessary for the purposes it was collected.
            <br/>
            <br/>
            9. Consent withdrawal: the right to withdraw anytime the consent to process own Personal Data.
            <br/>
            <br/>
            10. The right to oppose: the right to oppose to the lawful processing of own personal data performed by the Provider, based on motives linked to particular situations.
            <br/>
            <br/>
            11. The right to request no longer to receive promotional messages.
            <br/>
            <br/>
            12. The right to not be subject to decisions based exclusively on automated processing, including profile creation, that may have juridic effects.
            <br/>
            <br/>
            13. The right to portability: as personal data is processed automatically, the User has the right to request the Provider to communicate the personal data in a structured, frequently used form, which can be read automatically.
            <br/>
            <br/>
            14. The right to file a complaint to the supervisory authority: the right to file a complaint to Data Processing Supervisory Authority in case you consider that your rights have been breached.
          </Typography>
          <Typography className={classes.subheader} variant="body1">
            Cookies + Initial Message
          </Typography>
          <Typography variant="body1">
            16. Cookies are files that allow the user to connect correctly to the web-page of the Provider and ease the placement of orders; they also allowing statistical analyses to be made.
            17. The Provider uses its own Cookie files for the purpose of remember who you are and your preferences
          </Typography>
          <Typography className={classes.subheader} variant="body1">
            Privacy Policy Update
          </Typography>
          <Typography variant="body1">
            18. The Provider reserves the right to update and modify the present rules regarding Personal Data protection at any time and without prior notification. The new rules are effective the moment they are published on the Web-Page of the Provider.
          </Typography>
          <Typography className={classes.subheader} variant="body1">
            Special Clauses
          </Typography>
          <Typography variant="body1">
            19. The Provider is not responsible for deficiencies caused by fortuitous events that may endanger the security of the server hosting the database containing the Personal Data.
            <br/>
            <br/>
            20. The Provider is not responsible for the confidentiality policy practiced by any third party accessible by links directing outside the web-page of the Provider.
          </Typography>

        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button
            color="primary"
            onClick={() => onClose()}
            variant="contained"
          >
            Confirm
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}

TermsModal.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

TermsModal.defaultProps = {
  open: false,
  onClose: () => {}
};

export default TermsModal;
