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
import { applicationClientUrls } from "../constant/urls";
import Footnote from "./footnote";
import Footer from "./footer";

export default function InvoiceFailedEmail() {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>Expensio Premium Payment Failed</Preview>
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
              Payment Failed Notification
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">Hi,</Text>
            <Text className="text-black text-[14px] leading-[24px]">
              We regret to inform you that your recent payment attempt of ₹50.00
              was unsuccessful. However, if the amount has been debited from
              your account, you will receive a refund within two to three
              working days.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Please contact our help center if you have any questions or need
              further assistance.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Thank you for your understanding and patience.
            </Text>

            <Footnote />
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
