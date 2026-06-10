"use client";

import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useSyncExternalStore } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import type { RichTextDocument, Scene } from "@/lib/domain/types";

const emptyDocument: RichTextDocument = {
  type: "doc",
  version: 1,
  content: [{ type: "paragraph", content: [{ type: "text", text: "" }] }],
};

type SceneBodyEditorProps = {
  scene?: Scene;
  onSave: (document: RichTextDocument) => Promise<void>;
};

export function SceneBodyEditor({ scene, onSave }: SceneBodyEditorProps) {
  const isClientReady = useClientReady();
  const sceneId = scene?.id ?? null;
  const sceneDocument = scene?.editorDocument ?? emptyDocument;
  const sceneDocumentSignature = useMemo(
    () => getDocumentSignature(sceneDocument),
    [sceneDocument],
  );

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Document,
      Paragraph,
      Text,
      Placeholder.configure({
        placeholder: "Begin drafting the active scene...",
      }),
    ],
    content: sceneDocument,
    editorProps: {
      attributes: {
        class:
          "editor-prose tiptap-editor-surface",
      },
    },
    onBlur: ({ editor: currentEditor }) => {
      if (!scene) {
        return;
      }

      void onSave(currentEditor.getJSON() as RichTextDocument);
    },
  });

  useEffect(() => {
    if (!isClientReady || !editor) {
      return;
    }

    if (!sceneId) {
      if (getDocumentSignature(editor.getJSON() as RichTextDocument) !== getDocumentSignature(emptyDocument)) {
        editor.commands.setContent(emptyDocument, false);
      }
      return;
    }

    if (getDocumentSignature(editor.getJSON() as RichTextDocument) !== sceneDocumentSignature) {
      editor.commands.setContent(sceneDocument, false);
    }
  }, [editor, isClientReady, sceneDocument, sceneDocumentSignature, sceneId]);

  if (!scene) {
    return (
      <Box sx={{ minHeight: 420, border: "1px solid", borderColor: "divider", bgcolor: "rgba(255,252,245,0.88)", p: { xs: 2, xl: 2.35 } }}>
          <Typography variant="overline" color="text.secondary">
            Scene body
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1.25 }}>
            Select a scene to begin rich-text drafting.
          </Typography>
      </Box>
    );
  }

  return (
    <Box>{isClientReady && editor ? <EditorContent editor={editor} /> : <EditorLoadingState />}</Box>
  );
}

function useClientReady() {
  return useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
}

function EditorLoadingState() {
  return (
    <Box className="tiptap-editor-shell">
      <Stack spacing={1.5}>
        <Skeleton height={20} sx={{ width: "40%" }} variant="rounded" />
        <Skeleton height={20} variant="rounded" />
        <Skeleton height={20} sx={{ width: "92%" }} variant="rounded" />
        <Skeleton height={20} sx={{ width: "78%" }} variant="rounded" />
        <Skeleton height={20} sx={{ width: "88%" }} variant="rounded" />
      </Stack>
    </Box>
  );
}

function getDocumentSignature(document: RichTextDocument) {
  return JSON.stringify(document);
}
