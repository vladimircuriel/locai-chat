const SUGGESTIONS = [
  {
    id: 'draft-email',
    label: 'Draft an email',
    icon: 'solar:document-add-outline',
  },
  {
    id: 'create-image',
    label: 'Create an image',
    icon: 'solar:gallery-linear',
  },
  {
    id: 'brainstorm',
    label: 'Brainstorm',
    icon: 'solar:lightbulb-linear',
  },
  {
    id: 'make-plan',
    label: 'Make a plan',
    icon: 'solar:checklist-linear',
  },
  {
    id: 'code',
    label: 'Code',
    icon: 'solar:code-linear',
  },
  {
    id: 'help-write',
    label: 'Help me write',
    icon: 'solar:pen-2-outline',
  },
  {
    id: 'get-advice',
    label: 'Get advice',
    icon: 'solar:square-academic-cap-2-outline',
  },
]

export type PromptSuggestion = (typeof SUGGESTIONS)[number]

export default SUGGESTIONS
