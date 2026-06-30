/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Text,
} from '@react-email/components';

interface ConnectEmailProps {
  candidateName: string;
  companyName: string;
  jobTitle: string;
  title: string;
}

const ConnectEmail: React.FC<ConnectEmailProps> = ({
  candidateName,
  companyName,
  jobTitle,
  title,
}: ConnectEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif' }}>
        <Container>
          <Heading>{title}</Heading>
          <Text>Hello {candidateName},</Text>
          <Text>
            {companyName} has reviewed your application for the{' '}
            <strong>{jobTitle}</strong> role and would like to connect with you.
          </Text>
          <Text>Please log in to Relevate to view details and respond.</Text>
          <Text>
            Cheers, <br /> Relevate Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ConnectEmail;
