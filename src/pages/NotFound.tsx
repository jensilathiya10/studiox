import { Meta } from "@/components/Meta";
import { PageHero, Rv, TextLink } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <Meta title="Page not found" description="This page could not be found." path="/404" />
      <meta name="robots" content="noindex" />
      <PageHero n="404" label="Not found" title={["This frame", <span key="a" className="acc">doesn’t exist.</span>]} intro="The page you’re looking for may have moved or never existed.">
        <Rv className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          <TextLink to="/">Back to home</TextLink>
          <TextLink to="/work">View the work</TextLink>
        </Rv>
      </PageHero>
    </>
  );
}
