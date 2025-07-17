import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectCard } from "@/components/project-card";
import { generateProject, type Project, projectTypes } from "@/utils/generate-brief";
import { SavedBriefingsList } from "@/components/saved-briefings-list";
import { Lightbulb, Sparkles, Plus, BookOpen } from "lucide-react";

export default function Home() {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [selectedProjectType, setSelectedProjectType] = useState<string>("");
  const [showSavedBriefings, setShowSavedBriefings] = useState(false);

  const handleGenerateChallenge = () => {
    const typeToUse = selectedProjectType === "random" ? undefined : selectedProjectType || undefined;
    const newProject = generateProject(typeToUse);
    setCurrentProject(newProject);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-inter">
      {/* Header Section */}
      <header className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Lightbulb className="text-primary-foreground w-4 h-4" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Briefly
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Gerador de Projetos para Designers
          </p>
          <p className="text-sm sm:text-base text-muted-foreground/80 max-w-xl mx-auto">
            Gere briefings fictícios para projetos de UX/UI e pratique suas habilidades de design
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {!showSavedBriefings ? (
          <>
            {!currentProject ? (
              /* Initial State / Generate Button */
              <div className="text-center space-y-8">
                <div className="space-y-6">
                  <Card className="border-border bg-card">
                    <CardContent className="pt-8 pb-8 sm:pt-12 sm:pb-12">
                      <div className="space-y-6">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                          <Sparkles className="text-primary w-8 h-8" />
                        </div>
                        <div className="space-y-4">
                          <h2 className="text-xl sm:text-2xl font-semibold text-card-foreground">
                            Pronto para um novo desafio?
                          </h2>
                          <p className="text-muted-foreground max-w-md mx-auto">
                            Escolha o tipo de projeto ou deixe em branco para gerar aleatoriamente
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          <Select value={selectedProjectType} onValueChange={setSelectedProjectType}>
                            <SelectTrigger className="w-full max-w-sm mx-auto">
                              <SelectValue placeholder="Selecione um tipo de projeto (opcional)" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="random">Tipo aleatório</SelectItem>
                              {projectTypes.map((type) => (
                                <SelectItem key={type.id} value={type.id}>
                                  {type.label} - {type.description}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Button 
                            onClick={handleGenerateChallenge}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-primary/25"
                            size="lg"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Gerar um desafio
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Button 
                    variant="outline"
                    onClick={() => setShowSavedBriefings(true)}
                    className="mx-auto"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Ver briefings salvos
                  </Button>
                </div>
              </div>
            ) : (
              /* Generated Project Display */
              <ProjectCard 
                project={currentProject} 
                onGenerateNew={handleGenerateChallenge}
                onSave={() => {/* Will implement in ProjectCard */}}
                onBack={() => setCurrentProject(null)}
                onShowSaved={() => setShowSavedBriefings(true)}
              />
            )}
          </>
        ) : (
          /* Saved Briefings List */
          <SavedBriefingsList 
            onBack={() => setShowSavedBriefings(false)}
            onLoadBriefing={(briefing) => {
              setCurrentProject(briefing);
              setShowSavedBriefings(false);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground/60">
            Criado com ❤️ para a comunidade de designers
          </p>
          <p className="text-xs text-muted-foreground/40 mt-2">
            <a href="#" className="hover:text-primary transition-colors">
              @criador
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
