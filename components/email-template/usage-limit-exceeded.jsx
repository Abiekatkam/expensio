import * as React from "react";

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import { applicationClientUrls } from "@/components/constant/urls";
import Footnote from "./footnote";
import Footer from "./footer";

const settingUrl = applicationClientUrls.host.home + "/v1/settings";


export default function UsageExceededEmail({
  plan = "Basic Plan",
  maxUsageLimit = 100,
}) {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>{`${plan} usage exceeded!`}</Preview>
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
              Usage Limit Reached
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">Hi,</Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Your account has <b>exceeded</b> the usage limit of{" "}
              <b>{maxUsageLimit} entries</b> for <b>{plan}</b>.
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              No worries, all data still there. Upgrade to <b>Premium Plan</b>{" "}
              to increase the entry limit and get all the Premium features.
            </Text>
            <Text>
              <Link
                href={settingUrl}
                className="bg-[#000000] p-2.5 px-3 rounded-md text-white text-[12px] font-medium no-underline text-center"
              >
                Upgrade now
              </Link>
            </Text>
            <Footnote hideNote={true} />
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
