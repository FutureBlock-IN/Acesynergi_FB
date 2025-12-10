import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Briefcase,
  UsersIcon,
  Calendar,
  DollarSign,
  Clock,
  Phone,
  Video,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BookConsultation() {
  const handleBookConsultation = () => {
    window.open("https://calendly.com/emmanuelg7", "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="flex-1 mt-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Profile Card */}
              <Card
                className="p-6 bg-card shadow-sm border-none"
                data-testid="card-profile"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <Avatar className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-700 text-white text-2xl font-bold">
                      SR
                    </AvatarFallback>
                  </Avatar>

                  {/* Profile Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h1
                        className="text-2xl font-bold text-foreground"
                        data-testid="text-expert-name"
                      >
                        SaiRam
                      </h1>
                      {/* <Badge 
                        variant="outline" 
                        className="bg-blue-50 text-blue-600 border-blue-200 text-xs"
                        data-testid="badge-verified"
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified Expe
                      </Badge> */}
                    </div>

                    <p
                      className="text-base text-muted-foreground mb-2"
                      data-testid="text-profession"
                    >
                      Trainer, Project Management, IT Service Management
                    </p>

                    <p className="text-sm text-muted-foreground mb-3">
                      Asynergi Expert is a seasoned IT consultant and corporate
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>Hyderabad</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        <span>25+ years experience</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UsersIcon className="w-4 h-4" />
                        <span>150+</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleBookConsultation}
                      className="bg-primary hover:bg-primary text-white"
                      data-testid="button-book-consultation"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Consultation - $20/hour
                    </Button>
                  </div>
                </div>
              </Card>

              {/* About Card */}
              <Card
                className="p-6 bg-card shadow-sm border-none"
                data-testid="card-about"
              >
                <h2 className="text-xl font-bold text-foreground mb-4">
                  About Asynergi Expert
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Seasoned IT consultant and corporate trainer with over 15
                  years of experience in delivering world-class training
                  programs to professionals and organizations worldwide.
                  Expertise spanning project management, IT service management,
                  business analysis, and digital transformation.
                </p>
              </Card>

              {/* Areas of Expertise Card */}
              <Card
                className="p-6 bg-card shadow-sm border-none"
                data-testid="card-expertise"
              >
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Areas of Expertise
                </h2>
                <div className="space-y-2">
                  {[
                    "Project Management (PMP, Agile, Scrum)",
                    "IT Service Management (ITIL)",
                    "Business Analysis",
                    "Process Improvement (Six Sigma, Lean)",
                    "Cloud Technologies (AWS, Azure, GCP)",
                    "Data Analytics",
                    "Digital Transformation",
                  ].map((area, index) => (
                    <p
                      key={index}
                      className="text-muted-foreground"
                      data-testid={`expertise-item-${index}`}
                    >
                      • {area}
                    </p>
                  ))}
                </div>
              </Card>

              {/* Recent Community Contributions Card */}
              
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Credentials Card */}
              <Card
                className="p-6 bg-card shadow-sm border-none"
                data-testid="card-credentials"
              >
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Credentials
                </h2>
                <p className="text-sm text-muted-foreground">
                  Verified Recently verified
                </p>
              </Card>

              {/* Consultation Details Card */}
              <Card
                className="p-6 bg-card shadow-sm border-none"
                data-testid="card-consultation-details"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <h2 className="text-xl font-bold text-foreground">
                    Consultation Details
                  </h2>
                </div>

                <div className="space-y-4">
                  <div
                    className="flex justify-between items-center"
                    data-testid="detail-rate"
                  >
                    <span className="text-sm text-muted-foreground">Rate:</span>
                    <span className="font-bold text-foreground">$20/hour</span>
                  </div>

                  <div
                    className="flex justify-between items-start"
                    data-testid="detail-response"
                  >
                    <span className="text-sm text-muted-foreground">
                      Response time:
                    </span>
                    <span className="text-sm font-medium text-teal-600 text-right">
                      Usually within 24 hours
                    </span>
                  </div>

                  <div
                    className="flex justify-between items-start"
                    data-testid="detail-consultations"
                  >
                    <span className="text-sm text-muted-foreground">
                      Consultations:
                    </span>
                    <span className="text-sm font-medium text-foreground text-right">
                      Video or Phone
                    </span>
                  </div>

                  <Button
                    onClick={handleBookConsultation}
                    className="w-full bg-primary hover:bg-primary text-white mt-4"
                    data-testid="button-schedule-consultation"
                  >
                    Schedule Consultation
                  </Button>
                </div>
              </Card>

              {/* Community Impact Card */}
              
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
