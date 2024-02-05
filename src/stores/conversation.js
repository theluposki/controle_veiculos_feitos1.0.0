import { defineStore } from "pinia";
import { ref } from "vue";

export const useConversationStore = defineStore("conversation", () => {
  const isVisibleConversation = ref(false);

  const messages = [
    {
      id: 1,
      sender: "Joelma da caçambinha", // remetente
      receiver: "Maria do rosario", // receptor
      message: "Oi como vai?",
      image: "",
      doc: "" 
    },
    {
      id: 2,
      sender: "Maria do rosario", // remetente
      receiver: "Joelma da caçambinha", // receptor
      message: "Sim, estou bem.",
      image: "",
      doc: "" 
    },
    {
      id: 3,
      sender: "Joelma da caçambinha", // remetente
      receiver: "Maria do rosario", // receptor
      message: "ja fez o fechamento?",
      image: "",
      doc: "" 
    },
    {
      id: 1,
      sender: "Joelma da caçambinha", // remetente
      receiver: "Maria do rosario", // receptor
      message: "Oi como vai?",
      image: "",
      doc: "" 
    },
    {
      id: 2,
      sender: "Maria do rosario", // remetente
      receiver: "Joelma da caçambinha", // receptor
      message: "Sim, estou bem.",
      image: "",
      doc: "" 
    },
    {
      id: 3,
      sender: "Joelma da caçambinha", // remetente
      receiver: "Maria do rosario", // receptor
      message: "ja fez o fechamento?",
      image: "",
      doc: "" 
    },
    {
      id: 1,
      sender: "Joelma da caçambinha", // remetente
      receiver: "Maria do rosario", // receptor
      message: "Oi como vai?",
      image: "",
      doc: "" 
    },
    {
      id: 2,
      sender: "Maria do rosario", // remetente
      receiver: "Joelma da caçambinha", // receptor
      message: "Sim, estou bem.",
      image: "",
      doc: "" 
    },
    {
      id: 3,
      sender: "Joelma da caçambinha", // remetente
      receiver: "Maria do rosario", // receptor
      message: "ja fez o fechamento?",
      image: "",
      doc: "" 
    },
    {
      id: 1,
      sender: "Joelma da caçambinha", // remetente
      receiver: "Maria do rosario", // receptor
      message: "Oi como vai? asdasda asd asdasdajsldjalsjdlj asdasdasdasd",
      image: "",
      doc: "" 
    },
    {
      id: 2,
      sender: "Maria do rosario", // remetente
      receiver: "Joelma da caçambinha", // receptor
      message: "Sim, estou bem.sdasdakçsçalksçdkçasldçalskdçaksçdklaçslkdça asdasdada asdasdas",
      image: "",
      doc: "" 
    },
    {
      id: 3,
      sender: "Joelma da caçambinha", // remetente
      receiver: "Maria do rosario", // receptor
      message: "ja fez o fechamento?",
      image: "https://source.unsplash.com/random?b=1",
      doc: "" 
    },
  ]
  const currentConversation = ref({});

  const setConversation = (conversation) => {
    currentConversation.value = { ...conversation, messages }
  }

  const setVisibleConversation = () => {
    isVisibleConversation.value = true;
  }

  const setNotVisibleConversation = () => {
    isVisibleConversation.value = false;
  }

  return {
    currentConversation,
    setConversation,
    isVisibleConversation,
    setVisibleConversation,
    setNotVisibleConversation
  }
});
