import React from "react";
import { Card, CardTitle, CardHeader, CardContent } from "./ui/card";
import Link from "next/link";
import { Link as LinkIcon, LucideIcon } from "lucide-react";

interface LinkItem {
  title: string;
  url: string;
}

interface QuickLinkCardProps {
  title: string;
  icon: LucideIcon;
  links: LinkItem[];
}

function QuickLinkCard({ title, icon: Icon, links }: QuickLinkCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="ml-6 md:ml-12 space-y-2">
        {links.map((link, index) => (
          <div key={index} className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-primary" />
            <Link
              href={link.url}
              className="hover:text-green-600 transition-colors"
            >
              {link.title}
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default QuickLinkCard;
