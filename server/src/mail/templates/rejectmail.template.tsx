import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Text,
} from '@react-email/components';

interface RejectEmailProps {
  candidateName: string;
  companyName: string;
  jobTitle: string;
  title: string;
}

const RejectEmail: React.FC<RejectEmailProps> = ({
  candidateName,
  companyName,
  jobTitle,
  title,
}: RejectEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif' }}>
        <Container>
          <Heading>{title}</Heading>
          <Text>Hello {candidateName},</Text>
          <Text>
            Thank you for applying to the <strong> {jobTitle} </strong>
            position at {companyName}.After reviewing applications, the employer
            has decided to move forward with other candidates whose profiles
            more closely match their current requirements.
          </Text>
          <Text>
            We encourage you to continue applying to relevant opportunities on
            Relevate.
          </Text>
          <Text>
            Regards, <br /> Relevate Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default RejectEmail;
