import * as React from "react";

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import Footer from "./footer";
import { applicationClientUrls } from "@/components/constant/urls";

export default function HelpCenterEmail({ message = "", email = "" }) {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>New Help Support Received</Preview>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[22px]">
              <Img
                src={applicationClientUrls.social.appLogoUrl}
                width="50"
                height="50"
                alt="expensio logo"
                className="block m-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 mb-[24px] mt-[12px] mx-0">
              Help support required
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>From:</strong> <Text>{email}</Text>
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
            <strong>Query:</strong> <Text>{message}</Text>
            </Text>
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
