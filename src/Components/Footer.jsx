import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";

export function FooterComponent() {
  return (
    <Footer container className="fixed bottom-0 rounded-none">
      <FooterCopyright href="#" by="SocialApp™" year={2025} />
    </Footer>
  );
}
