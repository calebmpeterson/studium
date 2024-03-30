import { Overlay } from "@/components/Overlay";
import { useShowToast } from "@/contexts/toasts";
import { css } from "@emotion/react";
import { mdiAbjadHebrew } from "@mdi/js";
import Icon from "@mdi/react";
import Head from "next/head";
import { FC, PropsWithChildren, useState } from "react";

interface SectionProps extends PropsWithChildren {
  title: string;
  layout?: "row" | "column";
}

const sectionLayoutCss = (layout: SectionProps["layout"]) => css`
  margin: 10px 0;
  display: flex;
  justify-content: start;
  gap: 20px;
  flex-direction: ${layout};
`;

const Section: FC<SectionProps> = ({ title, children, layout = "row" }) => (
  <div>
    <header data-muted>{title}</header>
    <hr />
    <div css={sectionLayoutCss(layout)}>{children}</div>
  </div>
);

const pageLayoutCss = css`
  position: relative;
  display: flex;
  justify-content: start;
  flex-direction: column;
  max-width: 800px;
  width: 800px;
  margin: 20px auto;
  gap: 20px;
`;

export default function Timeline() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const onOpenOverlay = () => {
    setIsOverlayOpen(true);
  };
  const onCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  const showToast = useShowToast();
  const onShowToast = () => {
    showToast({ message: "Hello, world." });
  };

  return (
    <>
      <Head>
        <title>Design System</title>
      </Head>

      <div css={pageLayoutCss}>
        <Section title="Typography" layout="column">
          <header>Header</header>
          <header data-sub-header>Sub-header</header>
          <div>Normal text</div>
          <div data-muted>Muted text</div>
          <small>Fine print text</small>
        </Section>

        <Section title="Navigation">
          <button>Button</button>
          <button data-is-active>Active Button</button>
          <button data-borderless>Borderless Button</button>
          <button data-borderless data-is-active>
            Active Borderless Button
          </button>
          <a href="#">Link</a>
          <button data-icon>
            <Icon size={0.7} path={mdiAbjadHebrew} />
          </button>
        </Section>

        <Section title="Forms">
          <form>
            <input type="text" placeholder="Text input" />
            <label>
              <input type="radio" /> Radio
            </label>
            <label>
              <input type="checkbox" /> Checkbox
            </label>
          </form>
        </Section>

        <Section title="Overlay">
          <button onClick={onOpenOverlay}>Open Overlay</button>
          {isOverlayOpen && (
            <Overlay title="Overlay" onClose={onCloseOverlay}>
              Overlay content
            </Overlay>
          )}
        </Section>

        <Section title="Toasts">
          <button onClick={onShowToast}>Show Toast</button>
        </Section>
      </div>
    </>
  );
}
