import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesSection() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-800">Our Services</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              We provide comprehensive information and resources to help improve health and quality of life.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Health Information</CardTitle>
              <CardDescription>
                Access to the latest research and information on health trends and treatments.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <Image
                src="/icon.png"
                width={350}
                height={200}
                alt="Health Information"
                className="rounded-lg object-cover w-full"
              />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </CardFooter>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Wellness Programs</CardTitle>
              <CardDescription>
                Comprehensive programs designed to improve overall wellness and quality of life through holistic
                approaches.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <Image
                src="/icon.png"
                width={350}
                height={200}
                alt="Wellness Programs"
                className="rounded-lg object-cover w-full"
              />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </CardFooter>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Educational Resources</CardTitle>
              <CardDescription>
                Educational materials and resources to help patients understand their health conditions.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <Image
                src="/icon.png"
                width={350}
                height={200}
                alt="Educational Resources"
                className="rounded-lg object-cover w-full"
              />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
