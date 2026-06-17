"use client";

import React from "react";

import { StrongPassword } from "@/components/strong-password";
import { TableColumn, Table } from "@/components/table"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import CodeBlock from "@/app/components/codeblock";
import { Badge } from "@/components";

const componentMeta = {
  title: "StrongPassword Entropy Primitive",
  description: "Shows password strength as the user types.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/strong-password.tsx",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const apiProperties: ApiProperty[] = [
                    { name: "value", type: "string", default: "required", description: "Controlled input string value monitoring active buffer parameters directly." },
                    { name: "onChange", type: "(value: string) => void", default: "required", description: "State handler updating the bound token value with each user keystroke." },
                    { name: "requirements", type: "ValidationRequirement[]", default: "defaultRequirements", description: "Custom logic mapping object matrix defining password test rules." },
                    { name: "onStrengthChange", type: "(score: number, valid: boolean) => void", default: "undefined", description: "Callback firing real-time score statistics and readiness verification states." },
                    { name: "showRequirementsPanel", type: "boolean", default: "true", description: "Toggles whether to drop down the checklist criteria container block layout on focus elements." },
                  ];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function StrongPasswordDocsPage() {
  const exampleCode = `import { useState } from "react";
import { StrongPassword } from "@/components/strong-password";

export function IdentityCredentialModule() {
  const [pass, setPass] = useState("");
  const [meta, setMeta] = useState({ score: 0, valid: false });

  return (
    <StrongPassword
      value={pass}
      onChange={setPass}
      onStrengthChange={(score, valid) => setMeta({ score, valid })}
      showRequirementsPanel={true}
      placeholder="Establish system token passcode..."
    />
  );
}`;

  return (
    <DocsPageFrame
      leftBar={
        <aside className="hidden py-10 lg:col-span-3 lg:block lg:h-[calc(100vh-3.5rem)] lg:sticky lg:top-14 lg:overflow-y-auto lg:pr-6 lg:border-r lg:border-border/40">
          <DocsSidebar />
        </aside>
      }
      rightBar={
        <DocsOutline
          title="On this page"
          items={[
            { label: "Interactive Component Box", href: "#interactive-demo" },
            { label: "StrongPassword API Configuration", href: "#props-api" },
          ]}
        />
      }
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">

        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Form Primitives", href: "/docs/components#forms" },
              { label: "StrongPassword Security Node", href: "/docs/components/forms/strong-password" },
            ]}
          />

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
              {componentMeta.title}
            </h1>
            <Badge variant="info">
              {componentMeta.version}
              </Badge>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">{componentMeta.description}</p>

        </div>

        <section id="interactive-demo" className="space-y-3 scroll-mt-20">
          <CodeBlock
            example={{
              id: "interactive-demo",
              title: "Interactive Implementation",
              description: "Type a password to see the strength meter.",
              code: exampleCode,
              render: () => {
                const [passwordValue, setPasswordValue] = React.useState("");
                const [currentScore, setCurrentScore] = React.useState(0);
                const [isFormValid, setIsFormValid] = React.useState(false);
                return (
                  <div className="w-full max-w-xs space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60">
                        Access Credential Verification
                      </label>
                      <StrongPassword
                        value={passwordValue}
                        onChange={setPasswordValue}
                        onStrengthChange={(score, valid) => {
                          setCurrentScore(score);
                          setIsFormValid(valid);
                        }}
                        placeholder="Input token characters..."
                      />
                    </div>
                    <div className="rounded-lg border border-border/40 bg-muted/10 p-3 space-y-1 text-[10px] font-mono">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground/50">PASSED_CRITERIA_NODES:</span>
                        <span className="text-foreground/80 font-semibold">{currentScore} / 5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground/50">VALIDATION_STATUS:</span>
                        <span className={`font-bold ${isFormValid ? "text-emerald-500" : "text-destructive"}`}>
                          {isFormValid ? "AUTHENTICATED_SECURE" : "FAILED_RISK_THRESHOLD"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              },
            }}
          />
        </section>

        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Properties API
              </h2>
              <p className="text-xs text-muted-foreground">
                All available props for this component.
              </p>
            </div>
          </div>

          <DocsPanel className="overflow-hidden rounded-xl">
            <Table<ApiProperty>
              variant="modern"
              columns={columns}
              data={apiProperties}
              rowKey={(prop) => prop.name}
            />
          </DocsPanel>
        </section>

        <DocsAdjacentNav />

        <footer className="border-t border-border/30 pt-4 text-center text-xs text-muted-foreground/40">
          © 2026 Venti UI Labs. UI made right.
        </footer>
      </main>
    </DocsPageFrame>
  );
}