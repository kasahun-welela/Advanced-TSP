import CardComponent from "@/components/CardComponent";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import mulesoft from "@/public/mulesoft.png";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div> */}

      <Card className="md:max-w-[80%] max-w-[90%] mx-auto md:ml-12">
        <div className="flex  gap-4 px-3">
          <div>
            <Image
              src={mulesoft}
              alt="Course Logo"
              className="rounded-lg w-xl"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Full Stack Web Development</h1>
            <p className="text-muted-foreground my-2 ">
              Comprehensive program covering both frontend and backend
              development. Learn to build complete web applications from start
              to finish using modern technologies and best practices.
            </p>

            <hr className="my-4" />
            <div className="space-y-4">
              <div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2">HTML & CSS</h3>
                  <p className="text-sm text-muted-foreground">
                    Master the fundamentals of web development with HTML5 and
                    CSS3. Learn responsive design, flexbox, grid, and modern CSS
                    frameworks.
                  </p>
                </CardContent>
              </div>
            </div>
          </div>
        </div>

        {/* <CardContent>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">HTML & CSS</h3>
                <p className="text-sm text-muted-foreground">
                  Master the fundamentals of web development with HTML5 and
                  CSS3. Learn responsive design, flexbox, grid, and modern CSS
                  frameworks.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">JavaScript</h3>
                <p className="text-sm text-muted-foreground">
                  Deep dive into JavaScript programming including ES6+ features,
                  DOM manipulation, async programming, and modern JavaScript
                  concepts.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">React</h3>
                <p className="text-sm text-muted-foreground">
                  Build interactive user interfaces with React. Cover
                  components, hooks, state management, routing, and advanced
                  React patterns.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Node.js</h3>
                <p className="text-sm text-muted-foreground">
                  Server-side development with Node.js. Learn Express.js, REST
                  APIs, database integration, authentication, and deployment.
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent> */}
      </Card>

      <Card className="md:max-w-[80%] max-w-[90%] mx-auto md:ml-12 my-4">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Need assistance with your course?
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <CardComponent
            title="Support"
            description="Get instant help on administrative issues from LEA, our AI assistant, or contact our support team."
            link="#"
          />
          <CardComponent
            title="Withdraw"
            description="Withdrawing from your program will end it permanently. You will need to reapply"
            link="#"
          />
        </CardContent>
      </Card>
    </>
  );
}
