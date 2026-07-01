{{- define "common.env" -}}
- name: PULSAR_SERVICE_URL
  value: pulsar://{{ .Release.Name }}-pulsar-standalone.pulsar.svc.cluster.local:6650
{{- end -}}