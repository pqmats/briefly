import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { type Project } from "@/utils/generate-brief";
import { Copy, RefreshCw, Users, AlertTriangle, Target, Settings, Save, Info, Package, Lightbulb, Star, ArrowLeft, BookOpen } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onGenerateNew: () => void;
  onSave?: () => void;
  onBack?: () => void;
  onShowSaved?: () => void;
}

export function ProjectCard({ project, onGenerateNew, onSave, onBack, onShowSaved }: ProjectCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: () => {
      console.log("Salvando projeto:", project);
      return apiRequest("/api/briefings", { 
        method: "POST",
        body: JSON.stringify(project)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/briefings"] });
      toast({
        title: "Briefing salvo!",
        description: "O briefing foi salvo com sucesso.",
      });
      onSave?.();
    },
    onError: (error) => {
      console.error("Erro ao salvar briefing:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o briefing. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleSaveBriefing = () => {
    saveMutation.mutate();
  };

  const handleCopyBriefing = async () => {
    const briefText = `
📌 Projeto: ${project.name}
🧭 Área: ${project.area}
📱 Tipo: ${project.type}
⏳ Duração: ${project.duration}

👥 Público-alvo: ${project.audience}

⚠️ Problema Central: ${project.problem}

🎯 Objetivo Principal: ${project.objective}

📋 Contexto: ${project.context}

🛠️ Funcionalidades Essenciais:
${project.features.map(feature => `• ${feature}`).join('\n')}

⚠️ Restrições e Limitações:
${project.constraints.map(constraint => `• ${constraint}`).join('\n')}

📦 Entregáveis Esperados:
${project.deliverables.map(deliverable => `• ${deliverable}`).join('\n')}

⭐ Inspirações de Referência:
${project.inspiration.map(inspiration => `• ${inspiration}`).join('\n')}
    `.trim();

    try {
      await navigator.clipboard.writeText(briefText);
      toast({
        title: "Briefing copiado!",
        description: "O briefing foi copiado para a área de transferência.",
      });
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o briefing. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation Buttons */}
      {(onBack || onShowSaved) && (
        <div className="flex items-center justify-between">
          {onBack && (
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </Button>
          )}
          {onShowSaved && (
            <Button 
              variant="outline"
              onClick={onShowSaved}
              className="flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Ver briefings salvos</span>
            </Button>
          )}
        </div>
      )}
      
      <Card className="border-border bg-card">
        <CardContent className="p-6 sm:p-8">
          {/* Project Header */}
          <div className="border-b border-border pb-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground">
                  {project.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                    {project.area}
                  </Badge>
                  <Badge variant="outline" className="border-border text-muted-foreground">
                    {project.type}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">Duração estimada</div>
                <div className="text-lg font-semibold text-card-foreground">
                  {project.duration}
                </div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-6">
            {/* Target Audience */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Users className="text-primary w-5 h-5" />
                <h3 className="font-semibold text-card-foreground">Público-alvo</h3>
              </div>
              <p className="text-muted-foreground pl-7">
                {project.audience}
              </p>
            </div>

            {/* Problem */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="text-orange-500 w-5 h-5" />
                <h3 className="font-semibold text-card-foreground">Problema Central</h3>
              </div>
              <p className="text-muted-foreground pl-7">
                {project.problem}
              </p>
            </div>

            {/* Objective */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Target className="text-green-500 w-5 h-5" />
                <h3 className="font-semibold text-card-foreground">Objetivo Principal</h3>
              </div>
              <p className="text-muted-foreground pl-7">
                {project.objective}
              </p>
            </div>

            {/* Context */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Info className="text-purple-500 w-5 h-5" />
                <h3 className="font-semibold text-card-foreground">Contexto</h3>
              </div>
              <p className="text-muted-foreground pl-7">
                {project.context}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Settings className="text-blue-500 w-5 h-5" />
                <h3 className="font-semibold text-card-foreground">Funcionalidades Essenciais</h3>
              </div>
              <ul className="text-muted-foreground pl-7 space-y-1">
                {project.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>

            {/* Constraints */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="text-yellow-500 w-5 h-5" />
                <h3 className="font-semibold text-card-foreground">Restrições e Limitações</h3>
              </div>
              <ul className="text-muted-foreground pl-7 space-y-1">
                {project.constraints.map((constraint, index) => (
                  <li key={index}>• {constraint}</li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Package className="text-indigo-500 w-5 h-5" />
                <h3 className="font-semibold text-card-foreground">Entregáveis Esperados</h3>
              </div>
              <ul className="text-muted-foreground pl-7 space-y-1">
                {project.deliverables.map((deliverable, index) => (
                  <li key={index}>• {deliverable}</li>
                ))}
              </ul>
            </div>

            {/* Inspiration */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Star className="text-amber-500 w-5 h-5" />
                <h3 className="font-semibold text-card-foreground">Inspirações de Referência</h3>
              </div>
              <div className="flex flex-wrap gap-2 pl-7">
                {project.inspiration.map((inspiration, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {inspiration}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button 
          onClick={handleCopyBriefing}
          variant="outline"
          className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium px-6 py-3 rounded-xl transition-all duration-200 border-border hover:border-primary/30 flex-1"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copiar briefing
        </Button>
        <Button 
          onClick={handleSaveBriefing}
          disabled={saveMutation.isPending}
          variant="outline"
          className="bg-green-500/10 hover:bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30 hover:border-green-500/50 font-medium px-6 py-3 rounded-xl transition-all duration-200 flex-1"
        >
          <Save className="w-4 h-4 mr-2" />
          {saveMutation.isPending ? "Salvando..." : "Salvar briefing"}
        </Button>
        <Button 
          onClick={onGenerateNew}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-primary/25 flex-1"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Novo briefing
        </Button>
      </div>
    </div>
  );
}
