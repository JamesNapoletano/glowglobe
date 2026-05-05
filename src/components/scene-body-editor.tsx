"use client";

import { Box, Card, CardContent, Chip, Skeleton, Stack, Typography } from "@mui/material";
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
      <Card sx={{ bgcolor: "rgba(248,251,255,0.76)" }}>
        <CardContent>
          <Typography variant="overline" color="text.secondary">
            Scene body
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1.25 }}>
            Select a scene to begin rich-text drafting.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ bgcolor: "rgba(255,255,255,0.99)", boxShadow: "0 18px 38px rgba(20,32,51,0.06)", border: "1px solid rgba(79, 98, 126, 0.12)" }}>
      <CardContent sx={{ p: { xs: 2, xl: 2.2 } }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: 1.25, alignItems: { xs: "flex-start", md: "center" }, mb: 1.6 }}>
          <Box>
            <Typography variant="overline" color="text.secondary">
              Scene body
            </Typography>
            <Typography variant="h3" sx={{ mt: 0.5 }}>
              Draft canvas
            </Typography>
          </Box>
          <Chip label="Saves on blur" size="small" sx={{ bgcolor: "rgba(248,251,255,0.92)" }} variant="outlined" />
        </Box>

        {isClientReady && editor ? <EditorContent editor={editor} /> : <EditorLoadingState />}
      </CardContent>
    </Card>
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
