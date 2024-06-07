import * as React from "react";

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

import Footer from "@/components/email-template/footer";
import Footnote from "@/components/email-template/footnote";
import { applicationClientUrls } from "../constant/urls";

export const RegisterEmail = ({ action_link = "" }) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>Register link to {applicationClientUrls.config.appName}</Preview>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 mb-[24px] mt-[22px] mx-0">
              Magic Link
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              To create your account, kindly follow the link provided below.
              Please note that the link will expire in 10 minutes.
            </Text>
            <Link
              className="bg-[#000000] p-2 px-2.5 mt-1 w-[60px] block rounded-md text-white text-[13px] font-normal no-underline text-center"
              href={action_link}
            >
              Register
            </Link>
            {/* <Text className="text-black text-[14px] mt-[16px] mb-[10px] leading-[24px]">
							or if you are on mobile, copy and paste this URL into your browser:{' '}
							<Row>
								<Link className="text-[#cc35e5] break-all text-sm flex w-[465px] leading-[24px]">
									{action_link.replace(/^https?:\/\//, '')}
								</Link>
							</Row>
						</Text> */}
            <Text className="text-gray-500 mt-[16px]">
              If you didn{"'"}t try to Sign up, you can safely ignore this
              email.
            </Text>
            <Footnote hideNote={true} />
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default RegisterEmail;
